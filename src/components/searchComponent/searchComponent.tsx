import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete";
import useOnclickOutside from "react-cool-onclickoutside";
import { SearchComponentProps } from '@interfaces';
import { SEARCH_DEBOUNCE_TIME } from '@constants';


export const SearchComponent = ({onPlaceNameChanged}: SearchComponentProps) => {

    const { ready, value, suggestions: { status, data }, setValue, clearSuggestions } = usePlacesAutocomplete({
      requestOptions: {
        /* Define search scope here */
      },
      debounce: SEARCH_DEBOUNCE_TIME,
    });

    const ref = useOnclickOutside(() => {
      // When user clicks outside of the component, we can dismiss
      // the searched suggestions by calling this method
      clearSuggestions();
    });
  
    const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
      // Update the keyword of the input element
      setValue(event.target.value);
    };
  
    const handleSelect = ({ description }: any) => () => {
      // When user selects a place, we can replace the keyword without request data from API
      // by setting the second parameter to "false"
      setValue(description, false);
      clearSuggestions();

      // Get latitude and longitude via utility functions
      getGeocode({ address: description }).then((results) => {
        const { lat, lng } = getLatLng(results[0]);
        onPlaceNameChanged(description, {lat, lng});
        setValue(''); // Reset the search input
      });
    };
  
    const renderSuggestions = () =>
      data.map((suggestion) => {
        const { place_id, structured_formatting: { main_text, secondary_text } } = suggestion;
  
        return (
          <li key={place_id} onClick={handleSelect(suggestion)}>
            <strong>{main_text}</strong> <small>{secondary_text}</small>
          </li>
        );
    });
  
    return (
      <div className="search" ref={ref}>
        <input
          value={value}
          onChange={handleInput}
          disabled={!ready}
          placeholder="Start typing location name"/>
        {/* We can use the "status" to decide whether we should display the dropdown or not */}
        {status === "OK" && <ul>{renderSuggestions()}</ul>}
      </div>
    );
  };

export default SearchComponent;