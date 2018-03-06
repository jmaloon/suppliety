import types from 'constants/CompanyActionTypes';

const initialState = {
  companies: {},
  status: {
    loaded: 0,
    count: 0
  }
};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.ADD_COMPANY_COUNT:
      const count = action.payload.count;
      return {
        ...state,
        status: {
          ...state.status,
          count
        }
      };
    case types.CREATE_COMPANY:
      return {
        ...state,
        status: {
          ...state.status,
          count: state.status.count + 1,
          loaded: state.status.loaded + 1
        },
        companies: {
          ...state.companies,
          [action.payload._id]: action.payload
        }
      };
    case types.FETCH_COMPANY:
      return {
        ...state,
        status: {
          ...state.status,
          loaded: !!state.companies[action.payload._id]
            ? state.status.loaded
            : state.status.loaded + 1
        },
        companies: {
          ...state.companies,
          [action.payload._id]: action.payload
        }
      };
    case types.FETCH_COMPANIES:
      const fetchedCompanies = {};
      action.payload.forEach(
        company => (fetchedCompanies[company._id] = company)
      );
      return {
        ...state,
        status: {
          ...state.status,
          loaded: state.status.loaded + action.payload.length
        },
        companies: {
          ...state.companies,
          ...fetchedCompanies
        }
      };
    case types.UPDATE_COMPANIES:
      const updatedCompanies = {};
      action.payload.forEach(
        company => (updatedCompanies[company._id] = company)
      );
      return {
        ...state,
        companies: {
          ...state.companies,
          ...updatedCompanies
        }
      };

    default:
      return state;
  }
}
