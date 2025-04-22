import { ref } from 'vue';

export enum DividendFrequency {
  Annually = 'Annually',
  Semiannually = 'Semiannually',
  Quarterly = 'Quarterly',
  Monthly = 'Monthly',
}

export enum ManagementApproach {
  Active = 'Active',
  Passive = 'Passive',
  Hybrid = 'Hybrid',
}

export enum InvestmentSuitability {
  CapitalGrowth = 'Capital growth',
  CapitalGrowthAndRegularIncome = 'Capital growth and regular income',
  RegularIncome = 'Regular income',
  IncomeDistribution = 'Income distribution',
}

export enum AssetCategory {
  AustralianEquities = 'Australian Equities',
  Cash = 'Cash',
  AustralianBonds = 'Australian Bonds',
  Technology = 'Technology',
  ShortsFundsAndGearedFunds = 'Shorts Funds & Geared Funds',
}

export interface IFilters {
  dividend_frequency: DividendFrequency[];
  management_approach: ManagementApproach[];
  investment_suitability: InvestmentSuitability[];
  asset_categories: AssetCategory[];
  one_year_return?: {
    min: string | null;
    max: string | null;
  };
  five_year_return?: {
    min: string | null;
    max: string | null;
  };
  management_fee?: {
    min: string | null;
    max: string | null;
  };
  fund_size?: {
    min: string | null;
    max: string | null;
  };
}

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

  const hasCompletedSearch = ref(false);

  const resetSearchResults = () => {
    searchResultsData.value = initialSearchResults;
    hasCompletedSearch.value = false;
  };

  const clearResults = () => {
    resetSearchResults();
    error.value = null;
  };

  //this should format each filter from eg. [0, 100] to "min": "0", "max": "100" - they should be string as noted in the documentation
  const formatMinMaxFilters = (filters: object) => {
    //only apply to five_year_return and one_year_return and management_fee and fund_size
    const includeFilters = ['five_year_return', 'one_year_return', 'management_fee', 'fund_size'];

    return Object.fromEntries(
      Object.entries(filters).map(([key, value]) => {
        if (Array.isArray(value) && includeFilters.includes(key)) {
          return [key, { min: value[0].toString(), max: value[1].toString() }];
        }
        return [key, value];
      })
    );
  };

  const startSearch = async (searchText: string, page: number, filters: object, sort: string) => {
    isLoading.value = true;
    error.value = null;

    if (!searchText.trim()) {
      resetSearchResults();
      return;
    }

    try {
      let body: Partial<object> = {
        search_text: searchText,
        from: page,
        size: 10,
      };
      if (filters !== null) {
        body = { ...body, ...formatMinMaxFilters(filters) };
      }
      if (sort) {
        body = { ...body, order_by: sort };
      }
      const response = await fetch(`https://search.betashares.services/search`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
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
      hasCompletedSearch.value = true;
    }
  };

  return {
    searchResultsData,
    isLoading,
    error,
    hasCompletedSearch,
    startSearch,
    clearResults,
  };
}
