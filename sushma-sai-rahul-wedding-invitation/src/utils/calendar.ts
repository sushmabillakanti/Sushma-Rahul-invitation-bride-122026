import { WEDDING_DETAILS } from '../data/weddingData';

export const createGoogleCalendarUrl = (title: string, description: string, location: string, startDate: string, endDate: string) => {
  // Format dates: YYYYMMDDTHHMMSSZ
  const formatDateForGoogle = (isoString: string) => {
    const d = new Date(isoString);
    return d.toISOString().replace(/-|:|\.\d\d\d/g, '');
  };

  const start = formatDateForGoogle(startDate);
  const end = formatDateForGoogle(endDate);

  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: title,
    dates: `${start}/${end}`,
    details: description,
    location: location
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
};

export const downloadIcsFile = (title: string, description: string, location: string, startDate: string, endDate: string) => {
  const formatDate = (isoString: string) => {
    return new Date(isoString).toISOString().replace(/-|:|\.\d\d\d/g, '');
  };

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Sushma & Sai Rahul Wedding//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:wedding-${Date.now()}@sushma-sairahul-wedding.com`,
    `DTSTAMP:${formatDate(new Date().toISOString())}`,
    `DTSTART:${formatDate(startDate)}`,
    `DTEND:${formatDate(endDate)}`,
    `SUMMARY:${title}`,
    `DESCRIPTION:${description.replace(/\n/g, '\\n')}`,
    `LOCATION:${location}`,
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.setAttribute('download', 'Sushma_SaiRahul_Wedding.ics');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const getWhatsAppShareUrl = () => {
  const message = encodeURIComponent(
    `🪷 You are cordially invited to celebrate the auspicious wedding of Sushma & Sai Rahul!\n\n` +
    `🗓 Date: Thursday, 12th November 2026\n` +
    `✨ Sumuhurtham: 9:27 PM\n` +
    `📍 Venue: Sri Shubham Palace Convention, Hyderabad\n\n` +
    `View full invitation & events schedule here: ${window.location.href}`
  );
  return `https://api.whatsapp.com/send?text=${message}`;
};
