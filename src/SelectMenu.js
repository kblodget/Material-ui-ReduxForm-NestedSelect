import Collapse from "@material-ui/core/Collapse";
import FormControl from "@material-ui/core/FormControl";

import IconExpandLess from "@material-ui/icons/ExpandLess";
import IconExpandMore from "@material-ui/icons/ExpandMore";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import MuiSelect from "@material-ui/core/Select";
import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";

const styles = () => {
  return {
    subMenuItem: {
      display: "flex",
      justifyContent: "center"
    },
    menuItem: {}
  };
};

const chapterFormValues = [
  {
    key: "international-4",
    caption: "France"
  },
  {
    key: "international-5",
    caption: "Africa"
  },
  {
    key: "international-6",
    caption: "United Kingdom"
  },
  {
    key: "usa-key",
    caption: "North American",
    subMenuItems: [
      {
        key: "usaChapter-1",
        caption: "Central"
      },
      {
        key: "usaChapter-2",
        caption: "East"
      }
    ]
  }
];

const SelectMenu = (props) => {
  /*class SelectMenu extends React.Component { */

  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen((open) => !open);
  };

  const handleSubMenuClose = () => {
    setOpen((open) => !open);
  };

  const { label, classes } = props;
  const renderMenuItems = () => {
    return (
      chapterFormValues !== undefined &&
      chapterFormValues.map((option) => {
        if (option.hasOwnProperty("subMenuItems")) {
          return (
            <React.Fragment>
              <MenuItem onClick={handleClick} className={classes.menuItem}>
                {option.caption}
                {open ? <IconExpandLess /> : <IconExpandMore />}
              </MenuItem>

              <Collapse in={open} timeout="auto" unmountOnExit>
                <hr />
                {option.subMenuItems.map((item) => (
                  <MenuItem key={item.key} className={classes.subMenuItem}>
                    {item.caption}
                  </MenuItem>
                ))}
              </Collapse>
            </React.Fragment>
          );
        }
        return (
          <MenuItem
            className={classes.menuItem}
            key={option.key}
            value={option.caption === "None" ? "" : option.caption}
          >
            {option.caption}
          </MenuItem>
        );
      })
    );
  };

  return (
    <FormControl>
      <InputLabel>{label}</InputLabel>
      <MuiSelect
        input={<Input id={`${props.id}-select`} />}
        value={props.value}
        {...props.input}
        {...props.custom}
      >
        {renderMenuItems()}
      </MuiSelect>
    </FormControl>
  );
};
export default withStyles(styles)(SelectMenu);
