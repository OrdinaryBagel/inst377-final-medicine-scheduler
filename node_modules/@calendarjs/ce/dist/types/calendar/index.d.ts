/**
 * Official Type definitions for LemonadeJS plugins
 * https://lemonadejs.com
 * Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
 */

declare function Calendar(el: HTMLElement, options?: Calendar.Options): Calendar.Instance;

declare namespace Calendar {
    /** Item passed to a `validRange` function — describes the cell being evaluated. */
    interface ValidRangeItem {
        date: string;
        [key: string]: any;
    }

    /** `validRange` may be a tuple of bounds (numeric or ISO strings) or a predicate
     *  returning truthy to disable a cell. */
    type ValidRange =
        | number[]
        | string[]
        | ((day: number, month: number, year: number, item: ValidRangeItem) => boolean | void);

    interface CloseOptions {
        /** Where the close was triggered from: 'button', 'escape', 'focusout', or any custom string. */
        origin?: string;
    }

    interface Options {
        /** Calendar type. Use picker for a responsive modal, auto to automatic detect screen size and open between default or picker. */
        type?: 'default' | 'auto' | 'picker' | 'inline';
        /** Date format. Excel like format dd/mm/yyyy */
        format?: string;
        /** Range picker */
        range?: boolean;
        /** Initial value. Accepts an ISO string, an Excel serial number, a `Date`, or `[start, end]` for range mode. */
        value?: number | string | Date | Array<number | string | Date>;
        /** Calendar value will be a excel-like number or a ISO string. Default false */
        numeric?: boolean;
        /** Show Footer. Default: true **/
        footer?: boolean;
        /** Show hour and minute picker **/
        time?: boolean;
        /** Show grid mode. Default: false */
        grid?: boolean;
        /** Placeholder */
        placeholder?: string;
        /** Disabled. Default false **/
        disabled?: boolean;
        /** Starting day of the week. From 0-6 where zero is Sunday and six is Saturday */
        startingDay?: number;
        /** Bounds tuple, or predicate returning truthy to disable a cell. */
        validRange?: ValidRange;
        /** Calendar events data */
        data?: Array<{ date: string; [key: string]: any }>;
        /** Update view on mouse wheel. Default: true */
        wheel?: boolean;
        /** Bind the calendar to an HTML input element, or `'auto'` to create one. */
        input?: HTMLInputElement | 'auto';
        /** Create events and assign the calendar classes for the input. Default: true */
        initInput?: boolean;
        /** Fired when the calendar value changes (date selection). */
        onchange?: (self: Instance, value: string | number) => void;
        /** Fired when the cursor moves between cells (e.g. arrow-key navigation). */
        onupdate?: (self: Instance, value: string) => void;
        /** Fired when the modal closes. `origin` identifies the source ('button', 'escape', 'focusout', or custom). */
        onclose?: (self: Instance, origin: string) => void;
        /** Fired when the modal opens. */
        onopen?: (self: Instance) => void;
        /** React-only: forwarded to the bound input's native `change` DOM event. Distinct from `onchange`. */
        onChange?: (e: Event) => void;
    }

    interface Instance {
        /** The root DOM element. */
        el: HTMLElement;
        /** Calendar type — may be re-assigned at runtime when initial type is 'auto'. */
        type?: 'default' | 'auto' | 'picker' | 'inline';
        /** Date format */
        format: string;
        /** Range picker */
        range: boolean;
        /** Value */
        value: number | string;
        /** Calendar value will be a excel-like number or a ISO string. Default false */
        numeric: boolean;
        /** Footer. Default: true **/
        footer: boolean;
        /** Show hour and minute picker **/
        time: boolean;
        /** Show grid mode. Default: false */
        grid: boolean;
        /** Placeholder */
        placeholder: string;
        /** Disabled. Default false **/
        disabled: boolean;
        /** Update view on mouse wheel. Default: true */
        wheel: boolean;
        /** Bound input element (created when `input: 'auto'`). */
        input: HTMLInputElement;
        /** Modal instance — present only when `type` resolves to 'picker' or 'default'. */
        modal?: any;
        /** Inner content element used as the focusable target for keyboard navigation. */
        content?: HTMLElement;
        /** Current view. */
        view?: 'days' | 'months' | 'years';
        /** Active range tuple as numeric (Excel-like) values when `range: true`; null otherwise. */
        rangeValues: [number, number] | null;
        /** Open the calendar modal */
        open: () => void;
        /** Close the calendar modal */
        close: (options?: CloseOptions) => void;
        /** Whether the calendar modal is currently closed. Returns undefined for inline calendars. */
        isClosed?: () => boolean | undefined;
        /** Change the view */
        setView: (view: 'days' | 'months' | 'years') => void;
        /** Go to the next month or year depending on the view */
        next?: () => void;
        /** Go to the previous month or year depending on the view */
        prev?: () => void;
        /** Reset the calendar value and close the modal when applicable */
        reset?: () => void;
        /** Get the current calendar value */
        getValue?: () => string | number;
        /** Set the current calendar value. Accepts ISO strings, Excel serial numbers, `Date` objects, or `[start, end]` tuples in range mode. */
        setValue?: (value: string | number | Date | Array<number | string | Date>) => void;
        /** Accept the selected value on the calendar */
        update?: () => void;
    }
}

export default Calendar;
