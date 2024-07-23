import { useState } from 'react';
import axios from 'axios';
import { fireMixin } from '../../utils/SwalModals';

const getPersonAnswers = async (ptId) => {
  const res = await axios.get(`/api/answers/${ptId}`);

  return res.data || [];
};

export const GetQuestions = () => {
  const [answers, setAnswers] = useState([{ question: 'Да', correct: 'Да', abit: 'Да' }]);
  const [ptId, setPtId] = useState('');

  const onButtonClick = async () => {
    const res = await getPersonAnswers(ptId);

    setAnswers(res);
  };

  const copyTable = () => {
    if (answers.length) {
      const elTable = document.querySelector('table');
      let range, sel;

      // Check if range and selection are supported by the browser
      if (document.createRange && window.getSelection) {
        range = document.createRange();
        sel = window.getSelection();

        // Unselect any element on the page
        sel.removeAllRanges();

        try {
          range.selectNodeContents(elTable);
          sel.addRange(range);
        } catch (e) {
          range.selectNode(elTable);
          sel.addRange(range);
        }

        document.execCommand('copy');
      }

      sel.removeAllRanges();
      fireMixin('Таблица скопирована', 'success');
    } else {
      fireMixin('Вы еще не получили данные', 'error');
    }
  };

  const downloadFile = ({ data, fileName, fileType }) => {
    // Create a blob with the data we want to download as a file
    const blob = new Blob([data], { type: fileType });
    // Create an anchor element and dispatch a click event on it
    // to trigger a download
    const a = document.createElement('a');
    a.download = fileName;
    a.href = window.URL.createObjectURL(blob);
    a.target = 'blank';
    const clickEvt = new MouseEvent('click', {
      view: window,
      bubbles: true,
      cancelable: true,
    });
    a.dispatchEvent(clickEvt);
    a.remove();
  };

  const exportToJson = () => {
    if (answers.length) {
      downloadFile({
        data: JSON.stringify(answers),
        fileName: 'questions.json',
        fileType: 'text/json',
      });
    } else {
      fireMixin('Вы еще не получили данные', 'error');
    }
  };
  return (
    <div className="flex flex-wrap min-w-[1400px] w-[80%] max-h-full bg-slate-400">
      <section className="flex flex-wrap w-full h-[30%] p-4 justify-center">
        <label htmlFor={'ptIdInput'} className="w-full text-xl text-center">
          Введите ИД persons_tests
        </label>
        <input
          type="text"
          className="w-[50%] my-4 py-2 px-1"
          value={ptId}
          id="ptIdInput"
          onChange={(el) => setPtId(el.target.value)}
        />
        <div className="w-full flex justify-around">
          <button type="button" className="w-[200px]" onClick={onButtonClick}>
            Получить данные
          </button>
          <button type="button" className="w-[200px]" onClick={exportToJson}>
            Получить json
          </button>
          <button type="button" className="w-[200px]" onClick={copyTable}>
            Скопировать таблицу
          </button>
        </div>
      </section>
      <div className="relative w-full max-h-[600px] overflow-y-auto p-2">
        {answers.length > 0 && (
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th className="px-6 py-3">Вопрос</th>
                <th className="px-6 py-3">Правильный ответ</th>
                <th className="px-6 py-3">Ответ абитуриента</th>
              </tr>
            </thead>
            <tbody className="max-w-[1400px]">
              {answers.map((answer, id) => (
                <tr key={id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4">{answer.question}</td>
                  <td className="px-6 py-4">{answer.correct}</td>
                  <td className="px-6 py-4">{answer.abit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
