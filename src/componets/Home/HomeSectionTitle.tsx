interface Props {
  text: string;
  color?: string;
  titleColro?: string;
  borderColor?: string;
}

const HomeSectionTitle = ({ text, color, titleColro, borderColor }: Props) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-1">
        <div
          className={`w-16 border-t ${
            borderColor ? borderColor : "border-primaryBlue/60"
          }`}
        ></div>
        <p
          className={` font-manrope ${
            titleColro ? titleColro : "text-primaryBlue/70"
          } font-bold text-sm `}
        >
          Our Recomendations
        </p>
      </div>
      <h1
        className={`${
          color ? color : "text-TitleColor"
        } font-bold text-3xl font-manrope`}
      >
        {text}
      </h1>
    </div>
  );
};

export default HomeSectionTitle;
