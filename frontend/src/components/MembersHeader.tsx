// icons
import { CiSearch } from "react-icons/ci";
export default function MembersHeader() {
  return (
    <div>
      <div className=" hidden md:flex items-center gap-x-1.5 border border-neutral-300 rounded-md px-1.5 py-0.5 text-sm">
        <CiSearch className="shrink-0" />
        <input className="focus:outline-none focus:ring-0 w-full" type="text" placeholder="Search member" />
      </div>
    </div>
  );
}
