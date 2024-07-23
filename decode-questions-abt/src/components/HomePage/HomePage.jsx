import { NavLink } from 'react-router-dom';

export const HomePage = () => {
  const links = [
    { to: 'questions', label: 'Получить вопросы по pers_test' },
    { to: 'questions', label: 'Пофиксить все ошибки' },
    { to: 'nullify', label: 'Обнулить тесты' },
    { to: 'questions', label: 'Уничтожить человека' },
    { to: 'questions', label: 'Что-то еще' },
  ];

  return (
    <div className="w-[70%] h-[80%] p-4 bg-white dark:bg-gray-600 rounded-xl shadow-lg">
      <div className="flex justify-center mb-6">
        <h3 className="text-3xl font-semibold text-gray-900 dark:text-gray-100">
          Навигационная панель
        </h3>
      </div>
      <div className="p-6 border-t border-blue-gray-50"></div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {links.map((el, id) => (
          <div
            key={id}
            className="flex items-center justify-center w-full h-[100px] text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          >
            <NavLink
              className="flex text-center w-full h-full items-center  py-2.5 px-5 "
              to={el.to}
            >
              <p className="text-xl w-full">{el.label}</p>
            </NavLink>
          </div>
        ))}
      </div>
    </div>
  );
};
