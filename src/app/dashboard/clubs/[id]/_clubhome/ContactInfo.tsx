import React from "react";

interface ContactItem {
  label: string;
  value?: string; // Optional value
  url?: string; // Optional URL for links
}

const contactItems: ContactItem[] = [
  { label: "Web", value: "example.com", url: "https://example.com" },
  {
    label: "Email",
    value: "contact@example.com",
    url: "mailto:contact@example.com",
  },
  { label: "Phone", value: "+123 456 7890", url: "tel:+1234567890" },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/username",
    url: "https://linkedin.com/in/username",
  },
  { label: "X", value: "x.com/username", url: "https://x.com/username" },
  {
    label: "Instagram",
    value: "instagram.com/username",
    url: "https://instagram.com/username",
  },
  {
    label: "Facebook",
    value: "facebook.com/username",
    url: "https://facebook.com/username",
  },
  { label: "Telegram", value: "t.me/username", url: "https://t.me/username" },
  { label: "Address", value: "123 Main Street, City, Country" },
  { label: "Profile (PDF)", value: "Download Profile", url: "/profile.pdf" },
];

const ContactInfo: React.FC = () => {
  return (
    <div className="bg-gray-100 ">
      <div className=" p-5">
        <h1 className="text-xl font-bold text-gray-800 mb-6">
          Contact Information
        </h1>
        <ul className="space-y-4">
          {contactItems.map(
            (item, index) =>
              item.value && (
                <li key={index} className="flex items-center">
                  <span className="font-medium w-28">{item.label}:</span>
                  {item.url ? (
                    <a
                      href={item.url}
                      target={item.url.startsWith("http") ? "_blank" : "_self"}
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-gray-700">{item.value}</p>
                  )}
                </li>
              )
          )}
        </ul>
      </div>
    </div>
  );
};

export default ContactInfo;
