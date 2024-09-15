"use client";

import React, { useState, useEffect, useRef } from "react";
import PageIllustration from "@/components/page-illustration";

export default function HeroHome() {
  const [forms, setForms] = useState([
    { isDisabled: false, content: [{ msg: "", type: "text" }], visible: false },
  ]);
  const [hoveredId, setHoveredId] = useState(-1);
  const [clicked, setClicked] = useState(-1)

  const handleMouseEnter = (id: number) => {
    setHoveredId(id);
    setClicked(-1);
  };

  const handleMouseLeave = () => {
    setHoveredId(-1);
    setClicked(-1);
  };

  // Create refs for textareas
  const textareaRefs = useRef<Array<HTMLTextAreaElement | null>>([]);

  // Add a new form and disable the existing ones
  const placeDummy = () => {
    const updatedForms = forms.map((form) => ({ ...form, isDisabled: true }));
    setForms([
      ...updatedForms,
      {
        isDisabled: true,
        content: [{ msg: "", type: "text" }],
        visible: false,
      }, // Add textbox content on the left
    ]);
  };

  const addForm = (textBoxContent: any) => {
    setForms((prevForms) => {
      // Update the content of the last form
      const updatedForms = prevForms.map((form, index) =>
        index === prevForms.length - 1
          ? { ...form, content: textBoxContent, isDisabled: true }
          : form
      );

      // Add a new empty form at the end
      return [
        ...updatedForms,
        {
          isDisabled: false,
          content: { msg: "", type: "text" },
          visible: false,
        }, // Add new form on the right
      ];
    });
  };

  const renderMsg = (content: any) => {
    return content.map(function (block: any) {
      if (block.type === 'source') {
        return (
          <div
              key={block.id}
              onMouseEnter={() => handleMouseEnter(block.id)}
              onMouseLeave={handleMouseLeave}
              style={{ position: "relative", display: "inline" }}
            >
              <u className={(hoveredId === block.id ? "text-sky-300" : "")}>{block.msg}</u>
              {hoveredId === block.id && (
                <div
                  style={{ position: "absolute", bottom: "100%", left: "50%" }}
                >
                  <button
                    type="button"
                    className={"focus:outline-none text-white " + (clicked == 0 ? "bg-green-400 hover:bg-green-400 " : "bg-green-600 hover:bg-green-800") + " font-medium rounded-lg text-sm px-3 py-2 me-2 mb-1"}
                    onClick={() => handleReact(block.msg, 1)}
                    disabled={clicked == 0}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="h-4 w-4"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z"
                      />
                    </svg>
                  </button>
                  <button
                    type="button"
                    className={"focus:outline-none text-white " + (clicked == 1 ? "bg-red-400 hover:bg-red-400 " : "bg-red-600 hover:bg-red-800") + " font-medium rounded-lg text-sm px-3 py-2 me-2 mb-1"}
                    onClick={() => handleReact(block.msg, 0)}
                    disabled={clicked == 1}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="h-4 w-4"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M7.498 15.25H4.372c-1.026 0-1.945-.694-2.054-1.715a12.137 12.137 0 0 1-.068-1.285c0-2.848.992-5.464 2.649-7.521C5.287 4.247 5.886 4 6.504 4h4.016a4.5 4.5 0 0 1 1.423.23l3.114 1.04a4.5 4.5 0 0 0 1.423.23h1.294M7.498 15.25c.618 0 .991.724.725 1.282A7.471 7.471 0 0 0 7.5 19.75 2.25 2.25 0 0 0 9.75 22a.75.75 0 0 0 .75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 0 0 2.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384m-10.253 1.5H9.7m8.075-9.75c.01.05.027.1.05.148.593 1.2.925 2.55.925 3.977 0 1.487-.36 2.89-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398-.306.774-1.086 1.227-1.918 1.227h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 0 0 .303-.54"
                      />
                    </svg>
                  </button>
                </div>
              )}  
            </div>
        )
      } else if (block.type === 'image') {
        return (
          <img src={block.msg} className="h-auto max-w-xl rounded-lg shadow-xl m-2"></img>
        )
      } else {
        return (
          block.msg
        )
      }
    });
  };

  // Fade in newly added form
  useEffect(() => {
    const timeoutIds = forms.map((form, index) => {
      if (!form.visible) {
        return setTimeout(() => {
          setForms((prevForms) =>
            prevForms.map((f, i) => (i === index ? { ...f, visible: true } : f))
          );
        }, 0);
      }
      return null;
    });

    return () => {
      timeoutIds.forEach((id) => id && clearTimeout(id));
    };
  }, [forms]);

  // Auto-resize the textarea
  const handleTextareaResize = (index: number) => {
    const textarea = textareaRefs.current[index];
    if (textarea) {
      textarea.style.height = "auto"; // Reset height
      textarea.style.height = `${textarea.scrollHeight}px`; // Set height to scrollHeight
    }
  };

  const handleReact = async (source: string, reward: number) => {
    setClicked(reward)
    try {
      const response = await fetch("http://127.0.0.1:5000/react-to-source", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ source: source, reward: reward }),
      });
    } catch (error) {
      console.error("Error during API request:", error);
    }
  };

  // Handle form submission and make a POST request to Flask API
  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    index: number
  ) => {
    e.preventDefault();

    const textarea = textareaRefs.current[index];
    const searchTerm = textarea?.value;

    if (searchTerm) {
      placeDummy();
      try {
        const response = await fetch(
          "http://127.0.0.1:5000/your-api-endpoint",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ query: searchTerm }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          const responseData = data.answer;
          console.log(responseData);
          addForm(responseData);
        } else {
          console.error("Error:", response.statusText);
        }
      } catch (error) {
        console.error("Error during API request:", error);
      }
    }
  };

  // Handle Enter key to submit the form
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLTextAreaElement>,
    formIndex: number
  ) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // Prevent creating a new line
      const formElement = document.querySelector(
        `#default-form-${formIndex}`
      ) as HTMLFormElement;
      if (formElement) {
        formElement.requestSubmit(); // Programmatically submit the form
      }
    }
  };

  return (
    <section className="relative">
      <PageIllustration />
      <div className="mx-auto w-[90%] px-4 sm:px-6">
        <div className="pb-12 pt-32 md:pb-20 md:pt-40">
          <div className="pb-12 text-center md:pb-16">
            <h1
              className="mb-6 border-y text-5xl font-bold [border-image:linear-gradient(to_right,transparent,theme(colors.slate.300/.8),transparent)1] md:text-6xl"
              data-aos="zoom-y-out"
              data-aos-delay={150}
            >
              VTHacks 2024
              <br className="max-lg:hidden" />
            </h1>
            <div className="mx-auto max-w-3xl">
              <p
                className="mb-2 text-lg text-gray-700"
                data-aos="zoom-y-out"
                data-aos-delay={300}
              >
                Simple is a modern website builder powered by AI that changes
                how companies create user interfaces together.
              </p>
            </div>
          </div>
          <div
            className="mx-auto w-[95%] shadow-2xl" // Added shadow-2xl here
            data-aos="zoom-y-out"
            data-aos-delay={600}
          >
            <div className="relative aspect-video rounded-2xl bg-gray-900 px-20 py-3 shadow-xl before:pointer-events-none before:absolute before:-inset-5 before:border-y before:[border-image:linear-gradient(to_right,transparent,theme(colors.slate.300/.8),transparent)1] after:absolute after:-inset-5 after:-z-10 after:border-x after:[border-image:linear-gradient(to_bottom,transparent,theme(colors.slate.300/.8),transparent)1]">
              <div className="relative mb-8 flex items-center justify-between before:block before:h-[9px] before:w-[41px] before:bg-[length:16px_9px] before:[background-image:radial-gradient(circle_at_4.5px_4.5px,_theme(colors.gray.600)_4.5px,_transparent_0)] after:w-[41px]">
                <span className="text-[13px] font-medium text-white">
                  MedBot
                </span>
              </div>
              <div className="font-mono text-gray-500 [&_span]:opacity-0">
                {forms.map((form, index) => {
                  return (
                    <div
                      key={index}
                      className={`my-8 w-[65%] transition-opacity duration-2000 ease-in ${
                        form.visible ? "opacity-100" : "opacity-0"
                      } ${index % 2 === 0 ? "ml-auto" : "mr-auto"}`} // Fade-in effect
                    >
                      {index % 2 === 0 ? (
                        <form
                          id={`default-form-${index}`}
                          className="w-full"
                          onSubmit={(e) => handleSubmit(e, index)} // Pass form index to handleSubmit
                        >
                          <textarea
                            id={`default-search-${index}`}
                            ref={(el) => (textareaRefs.current[index] = el)}
                            disabled={form.isDisabled}
                            rows={1} // Initial height
                            className={`block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 resize-none overflow-hidden ${
                              form.isDisabled
                                ? "bg-gray-300 cursor-not-allowed"
                                : "dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                            }`}
                            placeholder={
                              form.isDisabled
                                ? "Search is disabled"
                                : "Tell me about..."
                            }
                            onInput={() => handleTextareaResize(index)} // Adjust height dynamically
                            onKeyDown={(e) => handleKeyDown(e, index)} // Handle Enter key submission
                            required
                          />
                        </form>
                      ) : (
                        <div
                          className={`block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white whitespace-pre-wrap`}
                        >
                          {form.content[0].msg != "" ? (
                            <p>{renderMsg(form.content)}</p>
                          ) : (
                            "Waiting for response..."
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
