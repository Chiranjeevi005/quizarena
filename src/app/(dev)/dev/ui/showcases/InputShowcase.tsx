import React from "react";
import {
  InputWrapper,
  InputGroup,
  InputField,
  InputLeftAddon,
  InputRightAddon,
  InputLabel,
  Input,
  InputDescription,
  InputHint,
  InputError,
  InputPrefix,
  InputSuffix,
  InputCounter,
} from "@/components/primitives/Input";
import { Icon } from "@/icons";

export function InputShowcase() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <InputWrapper>
        <InputLabel htmlFor="default">Default Input</InputLabel>
        <Input id="default" placeholder="Enter text..." />
        <InputDescription>This is a standard input field.</InputDescription>
      </InputWrapper>

      <InputWrapper>
        <div className="flex justify-between">
          <InputLabel htmlFor="with-hint">With Hint & Counter</InputLabel>
          <InputHint>Optional</InputHint>
        </div>
        <Input id="with-hint" placeholder="Enter text..." />
        <div className="flex justify-between">
          <InputDescription>Maximum 50 characters allowed.</InputDescription>
          <InputCounter current={12} max={50} />
        </div>
      </InputWrapper>

      <InputWrapper>
        <InputLabel htmlFor="prefix-suffix">Prefix & Suffix</InputLabel>
        <InputGroup>
          <InputPrefix>
            <Icon name="Search" className="w-4 h-4" />
          </InputPrefix>
          <Input id="prefix-suffix" className="pl-10 pr-10" placeholder="Search..." />
          <InputSuffix>
            <Icon name="Command" className="w-4 h-4" />
          </InputSuffix>
        </InputGroup>
      </InputWrapper>

      <InputWrapper>
        <InputLabel htmlFor="addons">Left & Right Addons</InputLabel>
        <InputField>
          <InputLeftAddon>https://</InputLeftAddon>
          <Input
            id="addons"
            className="rounded-none rounded-r-md border-l-0"
            placeholder="example.com"
          />
        </InputField>
      </InputWrapper>

      <InputWrapper>
        <InputLabel htmlFor="loading">Loading State</InputLabel>
        <Input id="loading" placeholder="Verifying..." isLoading />
      </InputWrapper>

      <InputWrapper>
        <InputLabel htmlFor="error-state" className="text-destructive">
          Error State
        </InputLabel>
        <Input
          id="error-state"
          placeholder="Invalid input"
          validationState="error"
          defaultValue="wrong@email"
        />
        <InputError validationState="error">Please enter a valid email address.</InputError>
      </InputWrapper>

      <InputWrapper>
        <InputLabel htmlFor="success-state" className="text-green-500">
          Success State
        </InputLabel>
        <Input
          id="success-state"
          placeholder="Valid input"
          validationState="success"
          defaultValue="correct@email.com"
        />
        <InputError validationState="success">Available!</InputError>
      </InputWrapper>
    </div>
  );
}
