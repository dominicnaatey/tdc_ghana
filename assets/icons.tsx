import type { IconProps } from "@/types/icon-props";

export function SearchIcon(props: IconProps) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="currentColor"
      {...props}
    >
      <g clipPath="url(#clip0_1699_11536)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M8.625 2.0625C5.00063 2.0625 2.0625 5.00063 2.0625 8.625C2.0625 12.2494 5.00063 15.1875 8.625 15.1875C12.2494 15.1875 15.1875 12.2494 15.1875 8.625C15.1875 5.00063 12.2494 2.0625 8.625 2.0625ZM0.9375 8.625C0.9375 4.37931 4.37931 0.9375 8.625 0.9375C12.8707 0.9375 16.3125 4.37931 16.3125 8.625C16.3125 10.5454 15.6083 12.3013 14.4441 13.6487L16.8977 16.1023C17.1174 16.3219 17.1174 16.6781 16.8977 16.8977C16.6781 17.1174 16.3219 17.1174 16.1023 16.8977L13.6487 14.4441C12.3013 15.6083 10.5454 16.3125 8.625 16.3125C4.37931 16.3125 0.9375 12.8707 0.9375 8.625Z"
        />
      </g>
      <defs>
        <clipPath id="clip0_1699_11536">
          <rect width="18" height="18" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

export function ChevronUpIcon(props: IconProps) {
  return (
    <svg
      width={22}
      height={22}
      viewBox="0 0 22 22"
      fill="currentColor"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.551 7.728a.687.687 0 01.895 0l6.417 5.5a.687.687 0 11-.895 1.044l-5.97-5.117-5.969 5.117a.687.687 0 01-.894-1.044l6.416-5.5z"
      />
    </svg>
  );
}

// Add these new icons
export function NewspaperIcon(props: IconProps) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      {...props}
    >
      <path d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5M5.25 19.5h13.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H5.25a2.25 2.25 0 00-2.25 2.25v10.5a2.25 2.25 0 002.25 2.25z" />
    </svg>
  );
}

export function HomeIcon(props: IconProps) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      {...props}
    >
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9,22 9,12 15,12 15,22" />
    </svg>
  );
}

export function MapIcon(props: IconProps) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      {...props}
    >
      <path d="M14.106 5.553a2.25 2.25 0 00-3.182 0L9.75 6.75l-3.75-.75a.75.75 0 00-.75.75v11.25c0 .414.336.75.75.75l4.5.75 4.5-.75 4.5.75a.75.75 0 00.75-.75V7.5a.75.75 0 00-.75-.75l-4.5-.75-1.174-1.197z" />
    </svg>
  );
}

export function FolderIcon(props: IconProps) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      {...props}
    >
      <path d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25H11.69z" />
    </svg>
  );
}

export function EnvelopeIcon(props: IconProps) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      {...props}
    >
      <path d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
    </svg>
  );
}