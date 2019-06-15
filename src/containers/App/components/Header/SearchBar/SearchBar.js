import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Autosuggest from 'react-autosuggest';
import { InputBase, InputAdornment, Paper, MenuItem } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

import { Router } from '../../../../../lib/routes';
import { useStateValue } from '../../../../../lib/stateProvider';
import styles from './styles';

const getSuggestions = (value, data) => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;
  return inputLength === 0
    ? []
    : data.filter(subject => subject.name.toLowerCase().slice(0, inputLength) === inputValue);
};

const getSuggestValue = suggestion => {
  return suggestion.name;
};

const SearchBar = ({ classes, id }) => {
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [data, setData] = useState([]);
  const { subjectData } = useStateValue()[0];

  useEffect(() => {
    subjectData.then(result => {
      const temp = [];
      result.forEach(obj => {
        temp.push({ id: obj.id, name: obj.name });
      });
      setData(temp);
    });
  }, []);

  const onSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(getSuggestions(value, data));
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const handleChange = (event, { newValue }) => {
    setInputValue(newValue);
  };

  const handleSubmit = event => {
    event.preventDefault();
    let subject;

    /* Check if found equals one of the suggestions  */
    const found = suggestions.some(el => {
      if (el.name.toLowerCase() === inputValue.toLowerCase()) {
        subject = el.id;
        return true;
      }
      return false;
    });
    if (found) {
      Router.pushRoute(`/subject/${subject}`);
    }
  };

  const onKeyDown = event => {
    if (event.key === 'Enter') {
      handleSubmit(event);
    }
  };

  const renderSuggestion = (suggestion, { isHighlighted }) => (
    <MenuItem
      classes={{
        root: classes.menuItem
      }}
      selected={isHighlighted}
      component="div"
      disableGutters
      onClick={() => Router.pushRoute('subject', { id: suggestion.id })}
    >
      {suggestion.name}
    </MenuItem>
  );

  const renderInputComponent = ({ ref, ...other }) => (
    <InputBase
      classes={{
        root: classes.inputRoot,
        input: classes.inputComp,
        focused: classes.inputFocused
      }}
      {...other}
      inputRef={node => {
        ref(node);
      }}
    />
  );

  const inputProps = {
    placeholder: 'Sök här...',
    value: inputValue,
    inputProps: {
      'aria-label': 'search bar'
    },
    variant: 'filled',
    color: 'primary',
    onKeyDown,
    onChange: handleChange,
    id: 'search-bar',
    endAdornment: (
      <InputAdornment position="end">
        <SearchIcon color="inherit" />
      </InputAdornment>
    )
  };
  return (
    <Autosuggest
      id={id}
      theme={{
        container: classes.container,
        suggestionsContainerOpen: classes.suggestionsContainerOpen,
        suggestionsList: {
          margin: '0',
          padding: '0',
          fontSize: '1rem'
        },
        suggestion: { display: 'flex' }
      }}
      suggestions={suggestions}
      onSuggestionsFetchRequested={onSuggestionsFetchRequested}
      onSuggestionsClearRequested={onSuggestionsClearRequested}
      onSuggestionSelected={handleSubmit}
      getSuggestionValue={getSuggestValue}
      renderSuggestionsContainer={option => (
        <Paper {...option.containerProps}>{option.children}</Paper>
      )}
      renderSuggestion={renderSuggestion}
      renderInputComponent={renderInputComponent}
      inputProps={inputProps}
    />
  );
};

export default withStyles(styles)(SearchBar);
