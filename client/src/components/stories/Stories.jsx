import "./stories.scss";
const Stories = () => {
  const user = {
    id: 0,
    name: "Jane Doe",
    img: "https://images.unsplash.com/photo-1668241282073-2cf47bae10d8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw4fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=1000&q=60",
  };

  const stories = [
    {
      id: 1,
      name: "Jane Doe",
      img: "https://images.unsplash.com/photo-1661347333354-80a3cb5440d7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=1000&q=60",
    },
    {
      id: 2,
      name: "Jane Doe",
      img: "https://images.unsplash.com/photo-1668248949793-12718a4dd485?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=1000&q=60",
    },
    {
      id: 3,
      name: "Jane Doe",
      img: "https://images.unsplash.com/photo-1668194645738-ef8dbb426086?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=1000&q=60",
    },
    {
      id: 4,
      name: "Jane Doe",
      img: "https://images.unsplash.com/photo-1668175582030-bb93dc18c1da?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=1000&q=60",
    },
  ];

  return (
    <div className="stories">
      <div className="story">
        <img src={user.img} alt="" />
        <span>{user.name}</span>
        <button>+</button>
      </div>

      {stories.map((val) => {
        return (
          <div className="story" key={val.id}>
            <img src={val.img} alt="" />
            <span>{val.name}</span>
          </div>
        );
      })}
    </div>
  );
};

export default Stories;
