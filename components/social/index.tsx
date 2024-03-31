import { BsGithub, BsTwitterX } from "react-icons/bs";
import { SiBuymeacoffee } from "react-icons/si";

export default function () {
  return (
    <div className="mx-auto flex flex-row items-center">
      <a
        href="https://github.com/Alvin-Liu"
        target="_blank"
        className="mr-6 flex items-center justify-center"
      >
        <BsGithub className="text-lg" />
      </a>
      <a
        href="https://twitter.com/Alvin_Liu_9527"
        target="_blank"
        className="mr-6 flex items-center justify-center"
      >
        <BsTwitterX className="text-lg" />
      </a>
      <a
        href="https://www.buymeacoffee.com/vnorange"
        target="_blank"
        className="flex items-center justify-center"
      >
        <SiBuymeacoffee className="text-lg" />
      </a>
    </div>
  );
}
