import { ChangeEvent, ReactElement } from "react";

import { IconButton, InputAdornment, TextField } from "@mui/material";
import styled from "styled-components";

import ClearIcon from "@/assets/svg/ClearIcon";
import SearchIcon from "@/assets/svg/SearchIcon";

const StyledDiv = styled.div`
  display: inline-flex;
  width: 100%;
  gap: 10px;

  .MuiIconButton-root {
    background-color: rgba(255, 188, 16, 1);
    color: #ffffff;
    box-shadow: 2px 2px 4px 0px rgba(255, 126, 32, 0.25);
  }

  .MuiInputBase-root {
    border-radius: 28px;
    border: 2px solid var(--orange, #ffbc10);
    background: var(--grey-3, rgba(225, 221, 209, 0.42));
    box-shadow: 2px 2px 4px 0px rgba(255, 126, 32, 0.25);

    &.Mui-focused {
      & .MuiOutlinedInput-notchedOutline {
        border-color: #ff7e20;
      }
    }

    .MuiInputBase-input {
      color: #000;
    }

    .MuiIconButton-root {
      background-color: transparent;
      box-shadow: none;
    }
  }
`;

interface Props {
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onClear?: () => void;
  placeholder?: string;
  onClick: (inputValue: string) => void;
  hasClear?: boolean;
}

const SearchBarWithButton = ({
  value,
  onChange,
  onClear,
  placeholder = "",
  onClick,
  hasClear = false,
}: Props): ReactElement => {
  return (
    <StyledDiv>
      <TextField
        fullWidth
        size="small"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        InputProps={{
          endAdornment: hasClear && onClear && (
            <InputAdornment position="end">
              <IconButton edge="end" onClick={onClear}>
                <ClearIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <IconButton onClick={() => onClick(value)}>
        <SearchIcon />
      </IconButton>
    </StyledDiv>
  );
};

export default SearchBarWithButton;
