import React, {
  ComponentType,
  InputHTMLAttributes,
  useState,
  useRef,
  useCallback,
  SVGProps,
} from "react";

import { Container } from "./styles";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  isPassword?: boolean;
  // icon: SVGProps<SVGElement>
}

const Input: React.FC<Props> = ({
  isPassword,
  // icon: Icon,
  ...rest
}) => {
  const [displayPassword, setDisplayPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputFocused = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputFilled = useCallback(() => {
    setIsFocused(false);
    setIsFilled(!!inputRef.current?.value);
  }, []);

  return (
    <Container isFocused={isFocused} isFilled={isFilled}>
      {/* {Icon && <Icon size={19} />} */}

      <input
        ref={inputRef}
        {...rest}
        type={isPassword ? "password" : rest.type}
        onFocus={handleInputFocused}
        onBlur={handleInputFilled}
      />

      {/* {isPassword &&
          (displayPassword ? (
            <FaEyeSlash
              size={19}
              color="#00e676"
              onClick={() => setDisplayPassword(!displayPassword)}
              className="display_password"
            />
          ) : (
            <FaEye
              size={19}
              color="#00e676"
              onClick={() => setDisplayPassword(!displayPassword)}
              className="display_password"
            />
          ))} */}
    </Container>
  );
};

export default Input;
