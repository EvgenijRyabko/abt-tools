import { useRef, useState } from 'react';
import axios from 'axios';
import { fireSwal } from '../../utils/SwalModals';

const getStudentTests = async (PIN) => {
  const res = await axios.post('/api/person/tests', { PIN });

  return res.data || [];
};

const nullifyTest = async (ptId) => {
  const res = await axios.delete(`/api/test/nullify/${ptId}`);

  return res.data || [];
};

export const NullifyTest = () => {
  const [pin, setPin] = useState('');
  const [tests, setTests] = useState([]);
  const selectRef = useRef();

  const onChange = async (e) => {
    setPin(e.target.value);

    if (e.target.value.length === 6) {
      const tests = await getStudentTests(e.target.value);

      setTests(tests);
    } else setTests([]);
  };

  const onButtonClick = async () => {
    const ptId = selectRef.current.value;

    if (!ptId || pin.length < 6) {
      fireSwal('Ошибка', 'Не все данные заполнены!', 'error');
    } else {
      await nullifyTest(ptId);
    }
  };

  return (
    <div className="w-[40%] h-[40%] p-4 bg-white dark:bg-gray-600 rounded-xl shadow-[0px_0px_100px__#4b5563]">
      <h1 className="w-full py-4 text-center text-3xl font-semibold text-gray-900 dark:text-gray-100">
        Обнуление теста
      </h1>
      <div className="grid grid-cols-[40%_60%] w-full p-4 py-8">
        <label
          htmlFor="pin"
          className="w-full text-center text-xl font-semibold text-gray-900 dark:text-gray-100"
        >
          Введите ПИН студента:
        </label>
        <input
          type="text"
          id="pin"
          className="rounded-md text-center"
          value={pin}
          onChange={onChange}
          placeholder="ПИН студента"
        />
      </div>
      <div className="grid grid-cols-[40%_60%] w-full p-4 py-8">
        <label
          htmlFor="pin"
          className="w-full text-center text-xl font-semibold text-gray-900 dark:text-gray-100"
        >
          Выберите тест:
        </label>
        <select className="rounded-md text-center" ref={selectRef}>
          {tests.map((el, id) => (
            <option key={id} value={el.id}>
              {el.name}
            </option>
          ))}
        </select>
      </div>
      <div className="w-full flex justify-center items-center">
        <button
          type="button"
          className="w-[200px] h-[50px] bg-blue-600 hover:bg-blue-800 transition duration-300 rounded-md text-gray-900 dark:text-gray-100"
          onClick={onButtonClick}
        >
          Обнулить тест
        </button>
      </div>
    </div>
  );
};
