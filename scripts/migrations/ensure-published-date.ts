import {defineMigration} from 'sanity/migrate';

export default defineMigration({
  title: 'Ensure publishedDate from month/year',
  async migrate({document, create, patch}) {
    if (document._type !== 'publication') return;

    const month = document.publishedMonth;
    const year = document.publishedYear;
    if (!month || !year) return;

    const date = `${year}-${month}-01`;
    const existing = document.publishedDate;

    if (existing === date) return;

    return patch(document._id).set({publishedDate: date});
  },
});