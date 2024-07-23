import Swal from 'sweetalert2';

export const fireMixin = (title, icon) => {
  Swal.mixin({
    toast: true,
    showConfirmButton: false,
    position: 'top-end',
    timer: 3000,
    timerProgressBar: true,
  }).fire({ title, icon });
};

export const fireSwal = (title, text, icon) => {
  Swal.fire({
    icon,
    title,
    text,
  });
};

/**
 *
 * @param {string} title
 * @param {{ inputId: string, label: string, inpuPlaceholder?: string }[]} inputArray
 */
export const fireSwalMultiple = async (title, inputArray) => {
  const { value } = await Swal.fire({
    title: title,
    html: `
    <form id="swal-form" class="flex w-full flex-wrap mt-2 gap-4">
    ${inputArray.map((el, id) => (
      <div key={id} className="flex w-full flex-wrap">
        <label htmlFor={el.inputId} className="w-full text-center text-xl">
          {el.label}
        </label>
        <input
          id={el.inputId}
          className="swal2-input w-full"
          type="text"
          placeholder={el.inpuPlaceholder && ''}
          required
        ></input>
      </div>
    ))}
    <div class="flex w-full justify-center">
          <button id="swal-confirm" class="swal2-confirm swal2-styled" type="submit">Подтвердить</button>
          <button id="swal-cancel" class="swal2-cancel swal2-styled" type="button">Отмена</button>
        </div>
    </form>
    `,
    preConfirm: () => {
      const res = {};

      for (const el of inputArray) {
        res[el.inputId] = document.getElementById(el.inputId).value;
      }
    },
    willOpen: () => {
      document.getElementById('swal-cancel').addEventListener('click', () => {
        Swal.close();
      });

      document.getElementById('swal-form').addEventListener('submit', (e) => {
        e.preventDefault();

        Swal.clickConfirm();
      });
    },
    width: 650,
    showConfirmButton: false,
  });

  return value;
};
