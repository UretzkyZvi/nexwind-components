import { FC } from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}
const Card: FC<CardProps> = ({ children, className }) => {
  return (
    <div
      className={`max-w-sm  mx-auto bg-white shadow-lg border border-gray-200 rounded-lg overflow-hidden ${className}`}
    >
      {children}
    </div>
  );
};

interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}
const CardHeader: FC<CardHeaderProps> = ({ children, className }) => {
  return (
    <div className={className ? className : "bg-gray-100 p-4"}>{children}</div>
  );
};

interface CardTitleProps {
  children: React.ReactNode;
}
const CardTitle: FC<CardTitleProps> = ({ children }) => {
  return <h2 className="text-lg font-semibold text-gray-900">{children}</h2>;
};

interface CardBodyProps {
  children: React.ReactNode;
}
const CardBody: FC<CardBodyProps> = ({ children }) => {
  return <div className="p-4">{children}</div>;
};

interface CardTextProps {
  children: React.ReactNode;
}
const CardText: FC<CardTextProps> = ({ children }) => {
  return <div className="text-gray-700">{children}</div>;
};

interface CardFooterProps {
  children: React.ReactNode;
}
const CardFooter: FC<CardFooterProps> = ({ children }) => {
  return (
    <div className="bg-gray-50 p-4 border-t border-gray-200">{children}</div>
  );
};

interface CardButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}
const CardButton: FC<CardButtonProps> = ({ children, onClick }) => {
  return (
    <button
      onClick={() => onClick && onClick()}
      className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50"
    >
      {children}
    </button>
  );
};

interface DefaultCardProps {
  className?: string;
  title?: string;
  text?: string;
  buttonText?: string;
  onClick?: () => void;
}
const DefaultCard: FC<DefaultCardProps> = ({
  buttonText,
  className,
  onClick,
  text,
  title,
}) => {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardBody>
        <CardText>{text}</CardText>
      </CardBody>
      <CardFooter>
        <CardButton onClick={onClick}>{buttonText}</CardButton>
      </CardFooter>
    </Card>
  );
};

interface CardWithImageHeaderProps {
  className?: string;
  imageSrc?: string;
  imageAlt?: string;
}

const CardWithImageHeader: FC<CardWithImageHeaderProps> = ({
  className,
  imageSrc,
  imageAlt,
}) => {
  return (
    <Card>
      <CardHeader className="relative p-4">
        <img
          src={
            imageSrc ? imageSrc : "https://picsum.photos/seed/picsum/640/440"
          }
          alt={imageAlt ? imageAlt : "random image"}
          className={
            className
              ? className
              : "static rounded-lg shadow-lg w-full h-fit object-fill"
          }
        />
      </CardHeader>
      <CardBody>
        <CardText>
          <div className="flex flex-col gap-4">
            <div className="text-lg font-bold leading-6">
              Card with Image Header
            </div>
            <div className="text-sm  ">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
              voluptas?
            </div>
          </div>
        </CardText>
      </CardBody>
    </Card>
  );
};

const CardWithImageHeaderAndFooter = () => {
  return (
    <Card>
      <CardHeader className="relative p-4">
        <img
          src="https://picsum.photos/seed/picsum/640/440"
          alt="random image"
          className="static rounded-lg shadow-lg w-full h-fit object-fill"
        />
      </CardHeader>
      <CardBody>
        <CardText>
          <div className="flex flex-col gap-4">
            <div className="text-lg font-bold leading-6">
              Card with Image Header
            </div>
            <div className="text-sm  ">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
              voluptas?
            </div>
          </div>
        </CardText>
      </CardBody>
      <CardFooter>
        <CardButton>Card Button</CardButton>
      </CardFooter>
    </Card>
  );
};

interface CardWithImageBodyProps {
  className?: string;
  imageSrc?: string;
  imageAlt?: string;
  title?: string;
  text?: string;
  onClick?: () => void;
}
const CardWithImageBody: FC<CardWithImageBodyProps> = ({
  className,
  imageSrc,
  imageAlt,
  title,
  text,
  onClick,
}) => {
  return (
    <Card className={`relative w-full   group ` + className}>
      <div onClick={onClick} className="hover:cursor-pointer">
        <img
          src={
            imageSrc ? imageSrc : "https://picsum.photos/seed/picsum/640/440"
          }
          alt={imageAlt ? imageAlt : "random image"}
          className="  top-0  w-full  object-cover  group-hover:scale-125 transition-all duration-300 ease-in-out"
          style={{ height: "200px" }}
        />
        <div className="absolute bottom-0 p-4 ">
          <div className="flex flex-col gap-4">
            <div className="text-lg font-bold leading-6">
              {title ? title : ""}
            </div>
            <div className="text-sm  ">{text ? text : " "}</div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export {
  DefaultCard,
  CardWithImageHeader,
  CardWithImageHeaderAndFooter,
  CardWithImageBody,
};
