import { useEffect, useState } from "react";
import Modal from "../../components/Modal";
import ControlledForm from "../../components/ConrolledForm";
import UncontrolledForm from "../../components/UncontrolledForm";
import { useAppSelector } from "../../store/store";
import { selectEntries } from "../../store/formSlice";
import type { FormData } from "../../store/formSlice";

const MainPage = () => {
  const [modalType, setModalType] = useState<"hook" | "uncontrolled" | null>(
    null,
  );
  const entries = useAppSelector(selectEntries);
  const [displayedEntries, setDisplayedEntries] = useState<FormData[]>([]);

  useEffect(() => {
    const newEntries = entries.filter(
      (entry) => !displayedEntries.some((e) => e.id === entry.id),
    );

    if (newEntries.length > 0) {
      setDisplayedEntries((prev) => [...prev, ...newEntries]);
    }
  }, [entries, displayedEntries]);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Forms</h1>

      <div className="flex justify-center gap-10 mb-8">
        <button
          className="bg-gray-500 text-white px-4 py-2 rounded cursor-pointer duration-300 ease-in-out hover:scale-110"
          onClick={() => setModalType("hook")}
        >
          Open Form with React Hook Form
        </button>
        <button
          className="bg-gray-500 text-white px-4 py-2 rounded cursor-pointer duration-300 ease-in-out hover:scale-110"
          onClick={() => setModalType("uncontrolled")}
        >
          Open Uncontrolled Form
        </button>
      </div>

      {displayedEntries.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {displayedEntries.map((entry) => (
            <div
              key={`${entry.id}-new`}
              className="border p-4 rounded-lg shadow-sm border-gray-300 bg-white new-entry"
            >
              {entry.image ? (
                <img
                  src={entry.image}
                  alt="User"
                  className="w-16 h-16 object-cover rounded-full mb-3 border border-gray-200"
                />
              ) : (
                <div className="w-16 h-16 bg-gray-200 rounded-full mb-3 flex items-center justify-center text-gray-500 text-sm">
                  No Image
                </div>
              )}
              <p>
                <strong>Name:</strong> {entry.name}
              </p>
              <p>
                <strong>Age:</strong> {entry.age}
              </p>
              <p>
                <strong>Email:</strong> {entry.email}
              </p>
              <p>
                <strong>Gender:</strong> {entry.gender}
              </p>
              <p>
                <strong>Country:</strong> {entry.country}
              </p>
            </div>
          ))}
        </div>
      )}

      <Modal isOpen={modalType === "hook"} onClose={() => setModalType(null)}>
        <ControlledForm onClose={() => setModalType(null)} />
      </Modal>

      <Modal
        isOpen={modalType === "uncontrolled"}
        onClose={() => setModalType(null)}
      >
        <UncontrolledForm onClose={() => setModalType(null)} />
      </Modal>
    </div>
  );
};

export default MainPage;
