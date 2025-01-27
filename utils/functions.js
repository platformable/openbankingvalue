import html2canvas from "html2canvas";

export const handleDownloadImage = async (element) => {
    const item = document.getElementById(element.Autonumber);
    const canvas = await html2canvas(item, { allowTaint: true,
         useCORS: true,
         width: item.scrollWidth,
        height: item.scrollHeight
        });

    const data = canvas.toDataURL("image/png", 1);
    const link = document.createElement("a");

    if (typeof link.download === "string") {
      link.href = data;
      link.download = "card.png";
      link.click();
    } else {
      window.open(data);
    }
  };