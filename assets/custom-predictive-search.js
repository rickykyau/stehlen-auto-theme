/**
 * Stehlen Auto — Custom Predictive Search
 * Year-range aware: typing "2004" matches "2003-2011 Honda Element"
 * Replaces Shopify's default predictive search entirely
 */
(function () {
  'use strict';

  var products = null;

  function loadProducts() {
    if (products) return products;
    var el = document.getElementById('stehlen-product-data');
    if (!el) return null;
    try {
      products = JSON.parse(el.textContent);
      products.forEach(function (p) {
        p._years = extractYearRange(p.t);
        p._searchText = [p.t, p.type || '', p.vendor || '', (p.tags || []).join(' ')].join(' ').toLowerCase();
      });
    } catch (e) {
      console.error('[CPS] Failed to parse product data', e);
      products = [];
    }
    return products;
  }

  function extractYearRange(title) {
    var m = title.match(/\b((?:19|20)\d{2})\s*[-\/]\s*((?:19|20)\d{2})\b/);
    if (m) return [parseInt(m[1]), parseInt(m[2])];
    m = title.match(/\b((?:19|20)\d{2})\b/);
    if (m) return [parseInt(m[1]), parseInt(m[1])];
    return null;
  }

  function matchesProduct(product, terms) {
    for (var i = 0; i < terms.length; i++) {
      var term = terms[i];
      var matched = false;

      // Check if term is a year (full 4 digits)
      var yearMatch = term.match(/^((?:19|20)\d{2})$/);
      if (yearMatch && product._years) {
        var year = parseInt(yearMatch[1]);
        if (year >= product._years[0] && year <= product._years[1]) {
          matched = true;
        }
      }

      // Check if term is a partial year (e.g. "198" or "19")
      if (!matched && /^\d{1,3}$/.test(term)) {
        // Check if any year in the product's range starts with this partial
        if (product._years) {
          for (var y = product._years[0]; y <= product._years[1]; y++) {
            if (String(y).indexOf(term) === 0) {
              matched = true;
              break;
            }
          }
        }
      }

      // Text match
      if (!matched && product._searchText.indexOf(term) !== -1) {
        matched = true;
      }

      if (!matched) return false;
    }
    return true;
  }

  function searchProducts(query, limit) {
    var prods = loadProducts();
    if (!prods) return [];
    limit = limit || 10;

    var terms = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
    if (!terms.length) return [];

    var results = [];
    for (var i = 0; i < prods.length && results.length < limit; i++) {
      if (matchesProduct(prods[i], terms)) {
        results.push(prods[i]);
      }
    }
    return results;
  }

  function escapeHtml(str) {
    var div = document.createElement('div');
    div.textContent = str || '';
    return div.innerHTML;
  }

  function highlightMatch(title, query) {
    var safe = escapeHtml(title);
    var terms = query.trim().split(/\s+/);
    terms.forEach(function (term) {
      if (!term) return;
      var re = new RegExp('(' + term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'gi');
      safe = safe.replace(re, '<mark>$1</mark>');
    });
    return safe;
  }

  function renderResults(results, query) {
    if (!results.length) {
      return '<div class="predictive-search-results__inner" data-search-results>' +
        '<div class="cps-no-results">No products found for "' + escapeHtml(query) + '"</div>' +
        '</div>';
    }

    var html = '<div class="predictive-search-results__inner" data-search-results>';
    html += '<div class="cps-results-header">Products</div>';
    html += '<div class="cps-results-list">';

    results.forEach(function (p, idx) {
      html += '<div class="cps-result-item predictive-search-results__card" data-index="' + idx + '" role="option">';
      html += '<a href="/products/' + escapeHtml(p.h) + '" class="cps-result-link">';
      if (p.img) {
        html += '<img class="cps-result-img" src="' + escapeHtml(p.img) + '" alt="" loading="lazy" width="60" height="60">';
      }
      html += '<div class="cps-result-info">';
      html += '<div class="cps-result-title">' + highlightMatch(p.t, query) + '</div>';
      html += '<div class="cps-result-price">' + escapeHtml(p.p) + '</div>';
      html += '</div>';
      html += '</a>';
      html += '</div>';
    });

    html += '</div></div>';
    return html;
  }

  function hookComponent(component) {
    if (component._cpsHooked) return;
    component._cpsHooked = true;

    var input = component.querySelector('input[type="search"]');
    var resultsContainer = component.querySelector('[ref="predictiveSearchResults"]');
    if (!input || !resultsContainer) return;

    var currentIndex = -1;
    var debounceTimer = null;

    // Stop Shopify's default search from firing by intercepting the input event
    // The component listens on:input="/search" — we add a capture-phase listener
    // that performs our search and then prevents the component's handler from overwriting
    input.addEventListener('input', function (e) {
      clearTimeout(debounceTimer);
      var q = input.value.trim();

      if (!q.length) {
        // Let the component's reset handle empty input
        return;
      }

      debounceTimer = setTimeout(function () {
        var results = searchProducts(q);
        resultsContainer.innerHTML = renderResults(results, q);
        currentIndex = -1;

        // Show the "View All" footer button
        var footer = component.querySelector('.predictive-search-form__footer');
        if (footer) footer.style.display = results.length ? 'block' : 'none';
      }, 100);
    }, true); // capture phase — fires before component

    // Block the component's own search method by monkey-patching
    // The component's `search` is a debounced method on the element
    if (component.search) {
      var origSearch = component.search;
      component.search = function () {
        var q = input.value.trim();
        if (q.length > 0) {
          // Don't let Shopify's search run — our handler already did it
          return;
        }
        // Empty input — let default reset happen
        return origSearch.apply(this, arguments);
      };
    }

    // Keyboard navigation
    input.addEventListener('keydown', function (e) {
      var items = resultsContainer.querySelectorAll('.cps-result-item');
      if (!items.length) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        e.stopImmediatePropagation();
        currentIndex = Math.min(currentIndex + 1, items.length - 1);
        updateSelection(items, currentIndex);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        e.stopImmediatePropagation();
        currentIndex = Math.max(currentIndex - 1, -1);
        updateSelection(items, currentIndex);
      } else if (e.key === 'Enter') {
        if (currentIndex >= 0 && items[currentIndex]) {
          e.preventDefault();
          e.stopImmediatePropagation();
          var link = items[currentIndex].querySelector('a');
          if (link) link.click();
        }
        // else: form submit handler redirects to /collections/all?search=
      }
    }, true);

    console.log('[CPS] Hooked predictive search component');
  }

  function updateSelection(items, index) {
    items.forEach(function (item, i) {
      item.classList.toggle('cps-selected', i === index);
      if (i === index) item.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    });
  }

  function init() {
    if (!loadProducts()) {
      setTimeout(init, 500);
      return;
    }

    var components = document.querySelectorAll('predictive-search-component');
    components.forEach(hookComponent);

    // Watch for dynamically added components (e.g. search modal opening)
    if (typeof MutationObserver !== 'undefined') {
      var observer = new MutationObserver(function () {
        document.querySelectorAll('predictive-search-component').forEach(hookComponent);
      });
      observer.observe(document.body, { childList: true, subtree: true });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Also hook when search modal opens
  document.addEventListener('click', function () {
    setTimeout(function () {
      document.querySelectorAll('predictive-search-component').forEach(hookComponent);
    }, 200);
  });
})();