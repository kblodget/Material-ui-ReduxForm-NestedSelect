import Collapse from "@material-ui/core/Collapse";
import FormControl from "@material-ui/core/FormControl";

import IconExpandLess from "@material-ui/icons/ExpandLess";
import IconExpandMore from "@material-ui/icons/ExpandMore";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import MuiSelect from "@material-ui/core/Select";
import React from "react";
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

class SelectMenu extends React.Component {
  /*
     const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen((open) => !open);
  };

  const handleSubMenuClose = () => {
    setOpen((open) => !open);
  };
*/
  state = {
    open: false
  };

  setOpen = () => {
    this.setState({
      ...this.state,
      open: !this.state.open
    });
  };

  handleClick = () => {
    this.setOpen();
  };

  handleSubMenuClose = () => {
    this.setState({
      ...this.state,
      menuOpen: false
    });
  };

  renderMenuItems = () => {
    const { classes } = this.props;
    return (
      chapterFormValues !== undefined &&
      chapterFormValues.map((option) => {
        if (option.hasOwnProperty("subMenuItems")) {
          return (
            <React.Fragment>
              <MenuItem onClick={this.handleClick} className={classes.menuItem}>
                {option.caption}
                {this.state.open ? <IconExpandLess /> : <IconExpandMore />}
              </MenuItem>

              <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                <hr />
                {option.subMenuItems.map((item) => (
                  <MenuItem
                    onClick={this.handleClick}
                    key={item.key}
                    className={classes.subMenuItem}
                  >
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

  render() {
    return (
      <FormControl className={this.props.className}>
        <InputLabel>{this.props.label}</InputLabel>
        <MuiSelect
          input={<Input id={`${this.props.id}-select`} />}
          value={this.props.value}
          {...this.props.input}
          {...this.props.custom}
        >
          {this.renderMenuItems()}
        </MuiSelect>
      </FormControl>
    );
  }
}
export default withStyles(styles)(SelectMenu);
