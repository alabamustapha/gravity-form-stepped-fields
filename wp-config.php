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
 * @link https://wordpress.org/support/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'gravity' );

/** MySQL database username */
define( 'DB_USER', 'homestead' );

/** MySQL database password */
define( 'DB_PASSWORD', 'secret' );

/** MySQL hostname */
define( 'DB_HOST', 'localhost' );

/** Database Charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The Database Collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         'eci1Sn38>fKnmf4WXxo;a,WHXJn)kZ+{Dp7^R^g=;&sX{k)tY2fJ8QZPr:NFF8jX' );
define( 'SECURE_AUTH_KEY',  '5:[)JFt, z*@o}UEy5-n-}yN]._L|KO<GQS7F4<-GP.Ri^z!r[vtZQde`/eUL]H;' );
define( 'LOGGED_IN_KEY',    'GAnuHwGrzU:s?q4%;lW;oZGe.^0%$MHhQ(trUXR6SC4XXRx-N3W8R+MZQkEyNhU(' );
define( 'NONCE_KEY',        '0-v%hH{d9]poL)rjC?`p1tt|rnvu+yB4uq%GTVA6_xF#zez%R5PY-TK0<U-?|H}Q' );
define( 'AUTH_SALT',        'SoBEdmE@Q+Nn|#:^-[D,a/tGwZdpyrHEPosK2~(uB:1?K19`2UZ;sq2tg }SH:6+' );
define( 'SECURE_AUTH_SALT', '>=A+ODRAT&!XfXsqr|8a+3(Pz6=6Em6hH@,TT!e>M%[7;sigPKs8>h}b&QU1oH1|' );
define( 'LOGGED_IN_SALT',   'v?yMu6V!Gw;B}.}mNE6ixcQ[V804X~wK,5?J&Ex%Q?Tnhrx!U6wpY8ZGZX1Xrl;Z' );
define( 'NONCE_SALT',       '*<3udD`ng{f8K:/40T<Gh-;wh9sx>CwB7Q+@M&+XPUy_&.kSX6=iA1@o[NQv!daP' );

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wpac_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/support/article/debugging-in-wordpress/
 */
define( 'WP_DEBUG', false );

/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
