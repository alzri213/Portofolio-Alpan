import Stack from "@/common/components/elements/StackImages";

const images = [
  { id: 1, img: "/images/profile/fikri-main.jpg" },
  { id: 2, img: "/images/profile/fikri-2.jpg" },
  { id: 3, img: "/images/profile/fikri-3.jpg" },
  { id: 4, img: "/images/profile/fikri-about.jpg" },
];

const StackImagesPersonal = () => {
  return (
    <div className="flex items-center justify-center pb-2">
      <Stack
        randomRotation={true}
        sensitivity={100}
        sendToBackOnClick={true}
        cardDimensions={{ width: 100, height: 150 }}
        cardsData={images}
      />
    </div>
  );
};

export default StackImagesPersonal;
