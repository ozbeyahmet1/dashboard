import Image from "next/image";

export const Header = () => {
  return (
    <div className="fixed z-50 w-full bg-white shadow-minimal">
      <div className="p-6">
        <Image
          src="https://res.cloudinary.com/droheqpxn/image/upload/v1682384700/innoloft/logo_innoloft_no-space_hmcwkr.svg"
          width={200}
          height={40}
          alt="logo"
        />
      </div>
    </div>
  );
};
