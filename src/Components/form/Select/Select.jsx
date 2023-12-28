import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import { useUpload } from "../../../context/UploadBlogContext";
// import CancelIcon from "@material-ui/icons/Cancel";
import CancelIcon from "@mui/icons-material/Cancel";
// import _without from "lodash/without";
import DeleteIcon from "@mui/icons-material/Delete";
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

// function getStyles(name, personName, theme) {
//   return {
//     fontWeight:
//       personName.indexOf(name) === -1
//         ? theme.typography.fontWeightRegular
//         : theme.typography.fontWeightMedium,
//   };
// }

export default function MultipleSelectChip({ selectArray, label }) {
  const { handleInputChange } = useUpload();
  const [listName, setListName] = React.useState([]);

  const handleChange = (e) => {
    handleInputChange(e);
    const {
      target: { value },
    } = e;
    setListName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  console.log(selectArray);
  const handleDelete = (e, value) => {
    e.preventDefault();
    const deleteData = listName.filter((item) => {
      return item !== value;
    });

    setListName(deleteData);
  };

  return (
    <div>
      <label htmlFor="input">{label} </label>
      <FormControl sx={{ m: 1, width: 288 }}>
        <InputLabel id="demo-multiple-chip-label">კატეგორია</InputLabel>
        <Select
          className="upload_select"
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={listName}
          onChange={handleChange}
          inputProps={{ name: "category_input" }}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <>
                  <Chip
                    key={value}
                    label={value}
                    clickable
                    deleteIcon={
                      <CancelIcon
                        onMouseDown={(event) => event.stopPropagation()}
                      />
                    }
                    onDelete={(e) => handleDelete(e, value)}
                  />
                </>
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {selectArray.data?.map((name) => (
            <MenuItem
              key={name.id}
              value={name.title}
              className="select_list"
              style={{
                backgroundColor: name.background_color,
                color: name.text_color,
              }}
            >
              {name.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}