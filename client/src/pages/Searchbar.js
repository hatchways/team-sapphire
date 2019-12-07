import React, { useState } from "react";
import {
  InputBase,
  Paper,
  IconButton,
  Select,
  MenuItem,
  Checkbox,
  ListItemText
} from "@material-ui/core";

import { useHistory } from "react-router-dom";
import SearchIcon from "@material-ui/icons/Search";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  search: {
    width: "48vw",
    height: "50px",
    borderRadius: "50px",
    paddingLeft: "10px",
    paddingTop: "5px",
    margin: "auto",
    fontWeight: 900
  },
  input: {
    width: "calc(100% - 58px - 140px - 140px)",
    marginLeft: "10px"
  },
  select: {
    marginRight: "5px",
    width: "135px",
    maxWidth: "135px"
  }
}));

const Searchbar = ({
  companies = [],
  platforms = {}
}) => {
  const history = useHistory();
  const [searchInput, setSearch] = useState("");
  const [selectedCompanies, setSelectedCompanies] = useState([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const [isPlatformOpen, setPlatformOpen] = useState(false);
  const [isCompanyOpen, setCompanyOpen] = useState(false);

  const handlePlatformClose = event => {
    setPlatformOpen(false);
  };

  const handlePlatformOpen = event => {
    setPlatformOpen(true);
  };

  const handlePlatformChange = event => {
    setSelectedPlatforms(event.target.value);
  };

  const handleCompanyClose = event => {
    setCompanyOpen(false);
  };

  const handleCompanyOpen = event => {
    setCompanyOpen(true);
  };

  const handleCompanyChange = event => {
    setSelectedCompanies(event.target.value);
  };

  const onSearchChange = event => {
    setSearch(event.target.value);
  };

  const handleSearchSubmit = event => {
    event.preventDefault();
    const search = event.target.searchfield.value;
    const selectedCompanies = event.target.companyfield.value;
    const selectedPlatforms = event.target.platformfield.value;
    history.push(`/dashboard?search=${search}&companies=${selectedCompanies}&platforms=${selectedPlatforms}`);
    window.location.reload();
  };

  const classes = useStyles();
  return (
    <>
      <Paper
        component="form"
        className={classes.search}
        onSubmit={handleSearchSubmit}
      >
        <InputBase
          placeholder="Search Contents..."
          className={classes.input}
          value={searchInput}
          onChange={onSearchChange}
          id="searchfield"
          name="searchfield"
        />
        <Select
          multiple
          className={classes.select}
          open={isCompanyOpen}
          onClose={handleCompanyClose}
          onOpen={handleCompanyOpen}
          renderValue={selected => selected.join(", ")}
          value={selectedCompanies}
          onChange={handleCompanyChange}
          id="companyfield"
          name="companyfield"
        >
          {companies.map((company, i) => {
            return (
              <MenuItem value={company.name} key={i}>
                <Checkbox
                  checked={selectedCompanies.indexOf(company.name) > -1}
                />
                <ListItemText primary={company.name} />
              </MenuItem>
            );
          })}
        </Select>
        <Select
          multiple
          className={classes.select}
          open={isPlatformOpen}
          onClose={handlePlatformClose}
          onOpen={handlePlatformOpen}
          renderValue={selected => selected.join(", ")}
          value={selectedPlatforms}
          onChange={handlePlatformChange}
          id="platformfield"
          name="platformfield"
        >
          {Object.keys(platforms).map((platform, i) => {
            return (
              <MenuItem value={platform} key={i}>
                <Checkbox
                  checked={selectedPlatforms.indexOf(platform) > -1}
                />
                <ListItemText primary={platform} />
              </MenuItem>
            );
          })}
        </Select>
        <IconButton
          type="submit"
          aria-label="search"
          onSubmit={handleSearchSubmit}
        >
          <SearchIcon />
        </IconButton>
      </Paper>
    </>
  );
};

export default Searchbar;
