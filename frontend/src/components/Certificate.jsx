import { useRef } from "react";

import html2canvas from "html2canvas";

import jsPDF from "jspdf";

function Certificate({
  studentName,
  courseName
}) {

  const certificateRef =
    useRef();

  // Download PDF
  const downloadCertificate =
    async () => {

      const canvas =
        await html2canvas(
          certificateRef.current
        );

      const imgData =
        canvas.toDataURL("image/png");

      const pdf =
        new jsPDF(
          "landscape",
          "mm",
          "a4"
        );

      pdf.addImage(
        imgData,
        "PNG",
        10,
        10,
        277,
        190
      );

      pdf.save(
        `${courseName}-certificate.pdf`
      );

    };

  return (
    <div className="mt-10">

      {/* Certificate */}
      <div
        ref={certificateRef}
        className="bg-white text-black rounded-3xl p-10 border-[12px] border-purple-600 shadow-2xl max-w-5xl mx-auto"
      >

        <div className="text-center">

          <h1 className="text-6xl font-bold text-purple-700 mb-6">

            Certificate

          </h1>

          <p className="text-2xl mb-8">

            This certificate is proudly presented to

          </p>

          <h2 className="text-5xl font-bold text-cyan-700 mb-8">

            {studentName}

          </h2>

          <p className="text-2xl mb-6">

            for successfully completing the course

          </p>

          <h3 className="text-4xl font-bold mb-10">

            {courseName}

          </h3>

          <div className="flex justify-between items-end mt-16 px-10">

            <div>

              <div className="border-t-2 border-black w-52 mb-2"></div>

              <p className="font-semibold">

                Instructor Signature

              </p>

            </div>

            <div>

              <p className="text-lg">

                Completion Date

              </p>

              <p className="font-bold text-xl">

                {new Date().toLocaleDateString()}

              </p>

            </div>

          </div>

        </div>

      </div>

      {/* Download Button */}
      <div className="flex justify-center mt-8">

        <button
          onClick={downloadCertificate}
          className="bg-gradient-to-r from-purple-600 to-cyan-500 px-10 py-4 rounded-2xl text-white font-semibold hover:scale-[1.03] transition"
        >

          Download Certificate

        </button>

      </div>

    </div>
  );
}

export default Certificate;