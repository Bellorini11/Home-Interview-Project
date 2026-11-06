import { useState } from "react";
export default function SearchBar({ onSearch }) {
 const [input, setInput] = useState("");
 const submit = (event) => {event.preventDefault();if(input.trim()) onSearch(input.trim());};
 return <form className="search-form" onSubmit={submit}><div className="search-form__group"><input className="search-form__input" type="search" value={input} onChange={e=>setInput(e.target.value)} placeholder="Search movies..." aria-label="Search movies" required/><button type="submit" className="search-form__button" aria-label="Search"><svg className="search-form__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg></button></div></form>;
}
