import Chip from "@mui/material/Chip";
import Autocomplete from "@mui/material/Autocomplete";
import Stack from "@mui/material/Stack";
import { SxProps } from "@mui/material";
import { InputText } from "../InputText";

interface AutocompleteDropdownProps {
  value: string[];
  name: string;
  onChange: (event: React.ChangeEvent<{}>, newValue: string[]) => void;
  options: string[];
  label: string;
  placeholder?: string;
  error?: string;
  required?: boolean;
  sx?: SxProps;
}

const AutocompleteDropdown: React.FC<AutocompleteDropdownProps> = ({
  value,
  name,
  onChange,
  options,
  label,
  placeholder,
  error,
  required,
  sx,
}) => {
  return (
    <Stack spacing={3} sx={{ width: "100%" }}>
      <Autocomplete
        multiple
        freeSolo
        id="tags-outlined"
        options={options}
        value={value}
        onChange={onChange}
        filterSelectedOptions
        renderTags={(value: readonly string[], getTagProps) =>
          value.map((option: string, index: number) => {
            const { key, ...tagProps } = getTagProps({ index });

            return (
              <Chip
                key={option}
                variant="outlined"
                label={option}
                {...tagProps}
              />
            );
          })
        }
        renderInput={(params) => (
          <InputText
            {...params}
            label={label}
            placeholder={placeholder}
            error={error}
            required={required}
            name={name}
            value={value.join(", ")}
          />
        )}
        sx={{ ...sx }}
      />
    </Stack>
  );
};

export default AutocompleteDropdown;
