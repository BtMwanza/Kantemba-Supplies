const Stripe = require('stripe');
const stripe = Stripe('sk_test_51HyYocE6g1Hts1VzIpp3WmAnxEAF9DlooSFO6icdaGiKmSf0PijmmT2GHwSwCgzQ4wX1fIyoP0XZgulTI0weae6a00d0b5JqaF');

stripe.charges.retrieve('ch_1HyZ16E6g1Hts1VzLHTtofuF', {
  api_key: 'sk_test_51HyYocE6g1Hts1VzIpp3WmAnxEAF9DlooSFO6icdaGiKmSf0PijmmT2GHwSwCgzQ4wX1fIyoP0XZgulTI0weae6a00d0b5JqaF'
});