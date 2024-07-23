import { NavLink } from 'react-router-dom';

export const HomePage = () => {
  const links = [{ to: 'questions', label: 'Получить вопросы' }];

  return (
    <div className="grid grid-cols-4 justify-evenly bg-slate-400 w-[80%] h-[80%] rounded-xl p-4">
      {links.map((el, id) => (
        <div
          key={id}
          className="grid w-[200px] h-[100px] bg-slate-200 hover:bg-slate-300 transition duration-300 rounded-xl items-center justify-self-center"
        >
          <NavLink className="grid w-full h-full items-center justify-center" to={el.to}>
            <p className="text-xl">{el.label}</p>
          </NavLink>
        </div>
      ))}
    </div>
  );
};
