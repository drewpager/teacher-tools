import { useEffect, useCallback, useReducer } from 'react';
import { server } from './server';

interface State<TData> {
  data: TData | null;
  loading: boolean;
  error: boolean;
}

interface QueryResult<TData> extends State<TData> {
  refetch: () => void;
}

type Action<TData> = 
  | { type: "FETCH"} 
  | { type: "FETCH_SUCCESS"; payload: TData } 
  | { type: "FETCH_ERROR" };

const reducer = <TData>() => (state: State<TData>, action: Action<TData>): State<TData> => {
  switch(action.type) {
    case "FETCH":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { 
        ...state, 
        data: action.payload,
        loading: false,
        error: false
      };
    case "FETCH_ERROR":
      return { ...state, loading: false, error: true };
    default:
      throw new Error("Reducer failed.") 
  }
};

export const useQuery = <TData = any>(query: string): QueryResult<TData> => {
  // const [state, setState] = useState<State<TData>>({ data: null, loading: false, error: false });
  const fetchReducer = reducer<TData>();
  const [state, dispatch] = useReducer(fetchReducer, {
    data: null,
    error: false,
    loading: true,
  });
  const fetch = useCallback(() => {
    const fetchAPI = async () => {
      try {
        dispatch({ type: "FETCH" })
        const { data, errors } = await server.fetch<TData>({ query });
        
        if (errors && errors.length) {
          throw new Error(errors[0].message);
        }
        dispatch({ type: "FETCH_SUCCESS", payload: data })
      } catch {
        dispatch({ type: "FETCH_ERROR" })
      }
    };
    fetchAPI();
  }, [query]);
  
  
  useEffect(() => {
    fetch();
  }, [fetch])
  
  return { ...state, refetch: fetch };
};