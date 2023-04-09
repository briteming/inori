import type { MarkdownHeading } from 'astro';
import type React from 'react';
import { unescape } from 'html-escaper';
import { useState, useEffect, useRef } from 'react';

type ItemOffsets = {
    id: string;
    topOffset: number;
};

const TableOfContents: React.FC<{ headings: MarkdownHeading[] }> = ({
    headings = [],
}) => {
    const toc = useRef(null);
    const onThisPageID = 'on-this-page-heading';
    const itemOffsets = useRef<ItemOffsets[]>([]);
    const [currentID, setCurrentID] = useState('overview');

    useEffect(() => {
        const getItemOffsets = () => {
            const titles = document.querySelectorAll('article :is(h1, h2, h3, h4)');
            itemOffsets.current = Array.from(titles).map((title) => ({
                id: title.id,
                topOffset: title.getBoundingClientRect().top + window.scrollY,
            }));
        };

        getItemOffsets();
        window.addEventListener('resize', getItemOffsets);

        return () => {
            window.removeEventListener('resize', getItemOffsets);
        };
    }, []);

    useEffect(() => {
        if (!toc.current) return;

        const setCurrent: IntersectionObserverCallback = (entries) => {
            for (const entry of entries) {
                if (entry.isIntersecting) {
                    const { id } = entry.target;
                    if (id === onThisPageID) continue;
                    setCurrentID(entry.target.id);
                    break;
                }
            }
        };

        const observerOptions: IntersectionObserverInit = {
            // Negative top margin accounts for `scroll-margin`.
            // Negative bottom margin means heading needs to be towards top of viewport to trigger intersection.
            rootMargin: '-100px 0% -66%',
            threshold: 1,
        };

        const headingsObserver = new IntersectionObserver(setCurrent, observerOptions);

        // Observe all the headings in the main page content.
        document.querySelectorAll('article :is(h1,h2,h3)').forEach((h) => headingsObserver.observe(h));

        // Stop observing when the component is unmounted.
        return () => headingsObserver.disconnect();
    }, [toc.current]);

    const onLinkClick = (e) => {
        e.preventDefault()
        const id = e.target.getAttribute('href').replace('#', '')
        setCurrentID(id);
        const target = document.getElementById(id)
        if(target) target.scrollIntoView({behavior: 'smooth'});
    };

    return (
        <nav className="lg:block order-2 pt-8 fixed right-0 top-14 text-sm leading-loose whitespace-nowrap text-ellipsis">
            <h2 id={onThisPageID} className="heading">
                On this page
            </h2>
            <ul className='list-none' ref={toc}>
                {headings
                    .filter(({ depth }) => depth > 1 && depth < 4)
                    .map((heading) => (
                        <li
                            key={heading.slug}
                            className={`header-link depth-${heading.depth} ${currentID === heading.slug ? 'text-accent' : ''
                                } hover:text-accent`.trim()
                            }
                        >
                            <a href={`#${heading.slug}`} onClick={onLinkClick}>
                                {unescape(heading.text)}
                            </a>
                        </li>
                    ))}
            </ul>
        </nav>
    );
};

export default TableOfContents;
