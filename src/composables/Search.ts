import { useDebounceFn } from '@vueuse/core';
import { ref } from 'vue';

export interface IResult {
  is_flagship_fund: boolean;
  flagship_description_short: string | null;
  flagship_description_long: string | null;
  flagship_image_url: string | null;
  is_betashares: boolean;
  issuer: string;
  fund_size: string;
  management_fee: string;
  classification: string;
  sub_classification: string;
  inception_date: string;
  dividend_frequency: string;
  investment_suitability: string;
  quick_ratio: number | null;
  current_ratio: number | null;
  price_to_book_ratio: number | null;
  market_capitalisation: number | null;
  sector: string | null;
  trailing_12m_dividend_yield: number | null;
  forward_12m_dividend_yield: string | null;
  management_approach: string;
  total_assets: number | null;
  total_revenue: number | null;
  pe_ratio_ttm: number | null;
  franking_credits: number | null;
  logo: string;
  symbol_openfigi: string;
  symbol: string;
  display_name: string;
  kind: string;
  asset_classes: string[];
  categories: string[];
  asset_categories: string[];
  asset_category_ids: string[];
  tags: string[];
  is_portfolio_excluded: boolean;
  is_auto_invest_included: boolean;
  currency: string;
  domicile: string;
  exchange: string;
  one_year_return: string | null;
  five_year_return: string | null;
}

export interface ISearchResult {
  results: IResult[];
  count: number;
  indexed_at: number;
}

const initialSearchResults: ISearchResult = {
  results: [],
  count: 0,
  indexed_at: 0,
};

export function useSearch() {
  const searchResultsData = ref<ISearchResult>(initialSearchResults);

  const isLoading = ref(false);
  const error = ref<string | null>(null);
  const searchText = ref('');

  const resetSearchResults = () => {
    searchResultsData.value = initialSearchResults;
  };

  const clearResults = () => {
    searchText.value = '';
    resetSearchResults();
    error.value = null;
  };

  const startSearch = async (searchText: string) => {
    isLoading.value = true;
    error.value = null;
    return await _performSearch(searchText);
  };

  const _performSearch = useDebounceFn(async (searchText: string) => {
    if (!searchText.trim()) {
      resetSearchResults();
      return;
    }

    try {
      const response = await fetch(`https://search.betashares.services/search`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          search_text: searchText,
        }),
      });

      if (!response.ok) {
        throw new Error(`Search failed with status: ${response.status}`);
      }

      const data = await response.json();
      searchResultsData.value = data;
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'An unknown error occurred';
      resetSearchResults();
    } finally {
      isLoading.value = false;
    }
  }, 550);

  return {
    searchResultsData,
    isLoading,
    error,
    searchText,
    startSearch,
    clearResults,
  };
}
