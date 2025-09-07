const Dot = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      className="h-3 w-3 text-white"
      fill="currentColor"
      viewBox="0 0 20 20"
      {...props}
    >
      <circle cx="10" cy="10" r="10" />
    </svg>
  );
};

export default Dot;
