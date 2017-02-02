<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://codex.wordpress.org/Editing_wp-config.php
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define('DB_NAME', 'lightincxc398');

/** MySQL database username */
define('DB_USER', 'lightincxc398');
//define('DB_USER', 'lightincxc752');

/** MySQL database password */
define('DB_PASSWORD', 'dG9DK2H48sRs');
//define('DB_PASSWORD', 'RxrKNGC84J64');
//3h!hip0dPkl!nrK8rB


/** MySQL hostname */
define('DB_HOST', 'mysql55-23.pro:3306');
//define('DB_HOST', 'localhost');

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         'QULT+CCjGxjnrUmRGjYUjK4jVKcF2o1dBQWnVaFp9tA8mJWzLv6F3IudPY+h');
define('SECURE_AUTH_KEY',  'L79LcjOHIkphyTt//YqHHlrjT3FRXYx5MEfB/A7RvYuV9yNKEubqO00u5Oyw');
define('LOGGED_IN_KEY',    '0HMrrpHq6s+LduImxKdZGUBLrsxhVQ+/PfYMnd94VWvNsbJ5MOW8uSA0MqLJ');
define('NONCE_KEY',        'TL4KrKbiHsNPEdgqAcZORW09MgWfA6ryLnFuxPn69PsnuMYMLu9NYFFeTN3b');
define('AUTH_SALT',        'T8SUNkmQkCJd72ujSrz9Hi3YQpFPduC0bCgEhSu8CQtmhRjNIzjvm4W4PZNS');
define('SECURE_AUTH_SALT', '1Bzpkmx7J7llrsuoiH0PAMwNij9my0GeKnHl03abDqW73Wk4gU1VG/vhaeLE');
define('LOGGED_IN_SALT',   'b1so3TI4BbI0kR8eOApDGMLbGYbs69DE7oTiG0fUwHFAX6705wyCXsOXKIFJ');
define('NONCE_SALT',       '2g8S/ioGKiJWmbeXiL3hCqMqX66unQqRLDxesiaQxTbQOlsm15GBdVr7Rlu7');

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'mod003_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the Codex.
 *
 * @link https://codex.wordpress.org/Debugging_in_WordPress
 */
define('WP_DEBUG', false);

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');
