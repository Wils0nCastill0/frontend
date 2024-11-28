import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input,
    Select,
    Textarea,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    Switch,
    InputGroup,
    InputRightElement,
    Button,
    InputProps,
    SelectProps,
    TextareaProps,
    NumberInputProps,
    SwitchProps
  } from '@chakra-ui/react';
  import { useState } from 'react';
  import { Eye, EyeOff } from 'lucide-react';
  
  // Interface base para todos los form controls
  interface BaseFormControlProps {
    label: string;
    error?: string;
    helperText?: string;
    isRequired?: boolean;
    isDisabled?: boolean;
  }
  
  // Input de texto
  interface FormInputProps extends BaseFormControlProps, Omit<InputProps, 'size'> {
    type?: 'text' | 'email' | 'password' | 'tel' | 'url';
  }
  
  export const FormInput = ({
    label,
    error,
    helperText,
    isRequired,
    isDisabled,
    type = 'text',
    ...props
  }: FormInputProps) => {
    const [showPassword, setShowPassword] = useState(false);
  
    return (
      <FormControl isInvalid={!!error} isRequired={isRequired} isDisabled={isDisabled}>
        <FormLabel>{label}</FormLabel>
        {type === 'password' ? (
          <InputGroup>
            <Input
              type={showPassword ? 'text' : 'password'}
              {...props}
            />
            <InputRightElement>
              <Button
                variant="ghost"
                onClick={() => setShowPassword(!showPassword)}
                size="sm"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </Button>
            </InputRightElement>
          </InputGroup>
        ) : (
          <Input type={type} {...props} />
        )}
        {error ? (
          <FormErrorMessage>{error}</FormErrorMessage>
        ) : (
          helperText && <FormHelperText>{helperText}</FormHelperText>
        )}
      </FormControl>
    );
  };
  
  // Select
  interface FormSelectProps extends BaseFormControlProps, Omit<SelectProps, 'size'> {
    options: Array<{ value: string | number; label: string }>;
  }
  
  export const FormSelect = ({
    label,
    error,
    helperText,
    isRequired,
    isDisabled,
    options,
    placeholder = 'Selecciona una opción',
    ...props
  }: FormSelectProps) => (
    <FormControl isInvalid={!!error} isRequired={isRequired} isDisabled={isDisabled}>
      <FormLabel>{label}</FormLabel>
      <Select placeholder={placeholder} {...props}>
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Select>
      {error ? (
        <FormErrorMessage>{error}</FormErrorMessage>
      ) : (
        helperText && <FormHelperText>{helperText}</FormHelperText>
      )}
    </FormControl>
  );
  
  // Textarea
  interface FormTextareaProps extends BaseFormControlProps, Omit<TextareaProps, 'size'> {}
  
  export const FormTextarea = ({
    label,
    error,
    helperText,
    isRequired,
    isDisabled,
    ...props
  }: FormTextareaProps) => (
    <FormControl isInvalid={!!error} isRequired={isRequired} isDisabled={isDisabled}>
      <FormLabel>{label}</FormLabel>
      <Textarea {...props} />
      {error ? (
        <FormErrorMessage>{error}</FormErrorMessage>
      ) : (
        helperText && <FormHelperText>{helperText}</FormHelperText>
      )}
    </FormControl>
  );
  
  // NumberInput
  interface FormNumberInputProps extends BaseFormControlProps, Omit<NumberInputProps, 'size'> {}
  
  export const FormNumberInput = ({
    label,
    error,
    helperText,
    isRequired,
    isDisabled,
    min,
    max,
    step,
    ...props
  }: FormNumberInputProps) => (
    <FormControl isInvalid={!!error} isRequired={isRequired} isDisabled={isDisabled}>
      <FormLabel>{label}</FormLabel>
      <NumberInput min={min} max={max} step={step} {...props}>
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
      {error ? (
        <FormErrorMessage>{error}</FormErrorMessage>
      ) : (
        helperText && <FormHelperText>{helperText}</FormHelperText>
      )}
    </FormControl>
  );
  
  // Switch
  interface FormSwitchProps extends BaseFormControlProps, Omit<SwitchProps, 'size'> {}
  
  export const FormSwitch = ({
    label,
    error,
    helperText,
    isRequired,
    isDisabled,
    ...props
  }: FormSwitchProps) => (
    <FormControl
      isInvalid={!!error}
      isRequired={isRequired}
      isDisabled={isDisabled}
      display="flex"
      alignItems="center"
    >
      <FormLabel mb="0">{label}</FormLabel>
      <Switch {...props} />
      {error ? (
        <FormErrorMessage>{error}</FormErrorMessage>
      ) : (
        helperText && <FormHelperText>{helperText}</FormHelperText>
      )}
    </FormControl>
  );