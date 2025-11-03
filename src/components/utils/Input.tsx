function Input(props: any) {
  return (
    <input
      {...props}
      className={`w-full h-10 px-5 outline-0 rounded ring-2 ${(props.error as boolean) ? "ring-red-400 focus:ring-red-400 placeholder-red-200/70" : "ring-white/20 focus:ring-white/50 placeholder-white/50"} duration-100`}
    />
  );
}

export default Input;