function HelperText({ helperText = "", className = "" }) {
  return (
    <div
      className={`text-phthaloGreen text-opacity-[0.37]  text-xs sm:text-sm ${className}`}
    >
      {helperText}
    </div>
  );
}

export default HelperText;
