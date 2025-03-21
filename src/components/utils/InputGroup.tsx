import Input from "./Input";

function InputGroup(props: any) {
  return (
    <div className={"my-4 flex justify-start items-center " + props.className}>
      <label htmlFor="" className="w-50 font-semibold text-lg">
        {props.label}
      </label>
      <div className="w-full max-w-150">
        <Input
          type={props.type}
          placeholder="..."
          disabled={props.disabled}
          {...props.register}
          error={props.error}
        />
      </div>
    </div>
  );
}

export default InputGroup;