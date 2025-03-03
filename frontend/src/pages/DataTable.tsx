import { useLocation } from "react-router-dom";
export default function Tickets() {
  const { pathname } = useLocation();
  let dataTableType = pathname === "/members" ? "Members" : "Tickets";
  return (
    <div className="p-1.5">
      <div className="px-3 py-1.5 bg-white shadow-md h-[89.5vh] overflow-x-hidden overflow-y-auto rounded-md overflow-hidden">
        <div>
          <table className={`w-full ${dataTableType === "Members" ? "table-auto" : "table-fixed"}`}>
            {/* header */}
            <thead className="border-b border-neutral-300 text-neutral-500">
              {dataTableType === "Members" ? (
                <tr>
                  <td>Member</td>
                  <td>Email</td>
                  <td>Join</td>
                  <td>Role</td>
                  <td>Account</td>
                </tr>
              ) : (
                <tr>
                  <td>Author</td>
                  <td>Title</td>
                  <td>Status</td>
                  <td>Priority</td>
                  <td>Created at</td>
                  <td>Updated at</td>
                  <td>Actions</td>
                </tr>
              )}
            </thead>
            {/* body */}
            {dataTableType === "Members" ? (
              <tbody className="text-sm">
                {[...Array(10)].map((_, index) => (
                  <tr
                    key={index}
                    className="border-b border-neutral-100 transition-colors ease-in-out duration-150 hover:border-neutral-300"
                  >
                    <td className="py-1.5">
                      <div className="flex items-center space-x-2">
                        <div className="w-[24px] aspect-square rounded-full overflow-hidden">
                          <img
                            className="w-full h-full object-center object-cover"
                            src="https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?cs=srgb&dl=pexels-italo-melo-2379005.jpg&fm=jpg"
                            alt=""
                          />
                        </div>
                        <span>Addis F.</span>
                      </div>
                    </td>
                    <td>
                      <span>haddis@gmail.com</span>
                    </td>
                    <td>
                      <div>
                        <span>5 hours ago</span>
                      </div>
                    </td>
                    <td>
                      <div>
                        <span>Super Admin</span>
                      </div>
                    </td>
                    <td>
                      <div>
                        <span>Active</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            ) : (
              <tbody className="text-sm">
                {[...Array(10)].map((_, index) => (
                  <tr
                    key={index}
                    className="border-b border-neutral-100 transition-colors ease-in-out duration-150 hover:border-neutral-300"
                  >
                    <td className="py-1.5">
                      <div className="flex items-center space-x-2">
                        <div className="w-[24px] aspect-square rounded-full overflow-hidden">
                          <img
                            className="w-full h-full object-center object-cover"
                            src="https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?cs=srgb&dl=pexels-italo-melo-2379005.jpg&fm=jpg"
                            alt=""
                          />
                        </div>
                        <span>Addis F.</span>
                      </div>
                    </td>
                    <td>
                      <span>Guzo Tick</span>
                    </td>
                    <td>
                      <div>
                        <span>Active</span>
                      </div>
                    </td>
                    <td>
                      <div>
                        <span>High</span>
                      </div>
                    </td>
                    <td>
                      <div>
                        <span>3 minutes ago</span>
                      </div>
                    </td>
                    <td>
                      <div>
                        <span>a minute ago</span>
                      </div>
                    </td>
                    <td>Actions</td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
        </div>
      </div>
    </div>
  );
}
