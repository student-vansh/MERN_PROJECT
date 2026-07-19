import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const NoteCard = ({ Note = {} }) => {
  const { title, description, image, path } = Note;
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  const handleClick = () => {
    if (!isLoggedIn) {
      navigate("/login", { state: { from: path } });
      return;
    }
    navigate(path);
  };

  return (
    <div
      onClick={handleClick}
      className="w-full rounded-lg overflow-hidden shadow hover:scale-102 hover:shadow-primary/25 duration-300 cursor-pointer"
    >
      <img src={image} alt={title} className="aspect-video w-full object-cover" />
      <div className="p-5">
        <h5 className="mb-2 font-medium text-gray-900">{title}</h5>
        <p
          className="mb-3 text-xs text-gray-600"
          dangerouslySetInnerHTML={{
            __html: description ? description.slice(0, 80) : "",
          }}
        />
        {!isLoggedIn && (
          <p className="text-xs text-primary font-medium">Login required</p>
        )}
      </div>
    </div>
  );
};

export default NoteCard;
