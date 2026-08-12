"use client";

type DeleteProductButtonProps = {
  productName: string;
};

export default function DeleteProductButton({
  productName,
}: DeleteProductButtonProps) {
  function handleClick(
    event: React.MouseEvent<HTMLButtonElement>
  ) {
    const confirmed = window.confirm(
      `"${productName}" ürününü silmek istediğinize emin misiniz?`
    );

    if (!confirmed) {
      event.preventDefault();
    }
  }

  return (
    <button
      type="submit"
      onClick={handleClick}
      className="cursor-pointer text-sm font-medium text-red-600 hover:text-red-700"
    >
      Sil
    </button>
  );
}