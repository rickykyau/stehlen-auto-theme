/**
 * Stehlen Auto — Custom Predictive Search
 * Year-range aware: typing "2004" matches "2003-2011 Honda Element"
 * Also matches text/keywords in title, type, vendor, tags
 */
(function () {
  'use strict';

  let products = null;

  function loadProducts() {
    if (products) return products;
    const el = document.getElementById('stehlen-product-data');
    if (!el) return null;
    try {
      products = JSON.parse(el.textContent);
      // Pre-compute year ranges
      products.forEach(function (p) {
        p._years = extractYearRange(p.t);
        p._searchText = [p.t, p.type, p.vendor, (p.tags || []).join(' ')].join(' ').toLowerCase();
      });
    } catch (e) {
      console.error('Failed to parse product data', e);
      products = [];
    }
    return products;
  }

  /**
   * Extract year range from title like "2003-2011 Honda Element"
   * Returns [startYear, endYear] or null
   */
  function extractYearRange(title) {
    // Match "YYYY-YYYY" or "YYYY/YYYY"
    var m = title.match(/\b((?:19|20)\d{2})\s*[-\/]\s*((?:19|20)\d{2})\b/);
    if (m) return [parseInt(m[1]), parseInt(m[2])];
    // Match single year "YYYY Something"
    m = title.match(/\b((?:19|20)\d{2})\b/);
    if (m) return [parseInt(m[1]), parseInt(m[1])];
    return null;
  }

  /**
   * Check if a search term (possibly a year) matches a product
   */
  function matchesProduct(product, terms) {
    for (var i = 0; i < terms.length; i++) {
      var term = terms[i];
      var matched = false;

      // Check if term is a year
      var yearMatch = term.match(/^((?:19|20)\d{2})$/);
      if (yearMatch && product._years) {
        var year = parseInt(yearMatch[1]);
        if (year >= product._years[0] && year <= product._years[1]) {
          matched = true;
        }
      }

      // Also check text match
      if (!matched && product._searchText.indexOf(term) !== -1) {
        matched = true;
      }

      if (!matched) return false;
    }
    return true;
  }

  /**
   * Search products and return matches
   */
  function searchProducts(query, limit) {
    var prods = loadProducts();
    if (!prods) return [];
    limit = limit || 8;

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

  /**
   * Render custom results HTML
   */
  function renderResults(results, query) {
    if (!results.length) {
      return '<div class="cps-no-results">No products found for "' + escapeHtml(query) + '"</div>';
    }

    var html = '<div class="cps-results" data-search-results>';
    html += '<div class="cps-results-header">Products</div>';
    html += '<div class="cps-results-list">';

    results.forEach(function (p, idx) {
      html += '<div class="cps-result-item" data-index="' + idx + '" role="option">';
      html += '<a href="/products/' + p.h + '" class="cps-result-link">';
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

  function escapeHtml(str) {
    var div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  function highlightMatch(title, query) {
    var safe = escapeHtml(title);
    var terms = query.trim().split(/\s+/);
    terms.forEach(function (term) {
      if (!term) return;
      // For year terms, also highlight year ranges containing that year
      var re = new RegExp('(' + term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'gi');
      safe = safe.replace(re, '<mark>$1</mark>');
    });
    return safe;
  }

  /**
   * Hook into the predictive search component
   */
  function init() {
    if (!loadProducts()) {
      // Retry after a short delay (product data might not be in DOM yet)
      setTimeout(init, 500);
      return;
    }

    // Find the search input(s) — there may be multiple (header + modal)
    var searchInputs = document.querySelectorAll('predictive-search-component input[type="search"]');
    if (!searchInputs.length) {
      setTimeout(init, 500);
      return;
    }

    searchInputs.forEach(function (input) {
      var component = input.closest('predictive-search-component');
      if (!component || component._cpsHooked) return;
      component._cpsHooked = true;

      var resultsContainer = component.querySelector('[ref="predictiveSearchResults"]');
      if (!resultsContainer) return;

      var debounceTimer = null;
      var currentIndex = -1;

      input.addEventListener('input', function () {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(function () {
          var q = input.value.trim();
          if (!q) return; // Let default reset handle empty

          var results = searchProducts(q);
          // Inject our custom results
          var html = renderResults(results, q);
          resultsContainer.innerHTML = html;
          currentIndex = -1;
        }, 150); // Slightly faster than the default 200ms debounce
      });

      // Keyboard navigation for our custom results
      input.addEventListener('keydown', function (e) {
        var items = resultsContainer.querySelectorAll('.cps-result-item');
        if (!items.length) return;

        if (e.key === 'ArrowDown') {
          e.preventDefault();
          e.stopPropagation();
          currentIndex = Math.min(currentIndex + 1, items.length - 1);
          updateSelection(items, currentIndex);
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          e.stopPropagation();
          currentIndex = Math.max(currentIndex - 1, -1);
          updateSelection(items, currentIndex);
        } else if (e.key === 'Enter') {
          if (currentIndex >= 0 && items[currentIndex]) {
            e.preventDefault();
            e.stopPropagation();
            var link = items[currentIndex].querySelector('a');
            if (link) link.click();
          }
          // If no selection, the form submit handler redirects to /collections/all?search=
        }
      }, true); // Capture phase to beat the component's handler
    });
  }

  function updateSelection(items, index) {
    items.forEach(function (item, i) {
      if (i === index) {
        item.classList.add('cps-selected');
        item.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      } else {
        item.classList.remove('cps-selected');
      }
    });
  }

  // Init when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Also re-init when search modal opens (dialog might lazy-load)
  document.addEventListener('click', function (e) {
    if (e.target.closest('[aria-controls="search-modal"]') || e.target.closest('button[aria-label*="Search"]')) {
      setTimeout(init, 100);
    }
  });
})();