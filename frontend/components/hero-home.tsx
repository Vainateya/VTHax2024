"use client";

import React, { useState, useEffect, useRef } from "react";
import PageIllustration from "@/components/page-illustration";

export default function HeroHome() {
  const [forms, setForms] = useState([
    { isDisabled: false, content: "", visible: false },
  ]);

  // Create refs for textareas
  const textareaRefs = useRef<Array<HTMLTextAreaElement | null>>([]);

  // Add a new form and disable the existing ones
  const placeDummy = () => {
    const updatedForms = forms.map((form) => ({ ...form, isDisabled: true }));
    setForms([
      ...updatedForms,
      { isDisabled: true, content: "...", visible: false }, // Add textbox content on the left
    ]);
  };

  const addForm = (textBoxContent: string) => {
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
        { isDisabled: false, content: "", visible: false }, // Add new form on the right
      ];
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
            className="mx-auto w-[90%] shadow-2xl" // Added shadow-2xl here
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
                          {form.content
                            ? form.content
                            : "Waiting for response..."}
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
