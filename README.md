<h1>jQuery UI Example</h1>
<p>Showing interactivity between calendar, slider, and progression</p>
<!-- -- >
<p><a href="http://jvmqueue.com//smallHtmlComponents/jQueryUI/calendar/site/">Live URL</a></p>


<h2>Current State</h2>
<p>Example developed March 2015</p>
<p>Using, but not limited to:</p>
<ul>
	<li>Primitive JavaScript</li>
	<li>jQuery</li>
	<li>jQuery UI</li>
	<li>Object oriented JavaScript</li>
	<li>jQuery</li>
	<li>CSS3</li>	
	<li>Hash Maps</li>
	<li>Grunt</li>
</ul>
<h3>Stategies and Techniques</h3>
<ul>
	<li>Event binding via jQuery UI</li>
	<li>Optimization: HTML document fragments to form DOM fragments before appending to HTML document</li>
	<li>CSS3 for presentation and use for JavaScript node manipulation, JS only sets CSS classes</li>
	<li>Optimization: setInterval used to wait for DOM available. This is optimization, avoiding the use of jQuery wait for DOM</li>
	<li>DRY, avoiding code repetition</li>
	<li>Grunt for CSS lint, JS Lint, and compression</li>
</ul>
</ul>
<h4>Fundemental Architecture</h4>
<dl>
	<h3>jQueryUI/calendar/site/</h3>
	<dd>html resources</dd>
	<dt>styles</dt>
	<dd>CSS resources</dd>
	<dt>scripts</dt>
	<dd>JS resources</dd>
	<dd>base/jquery-1.11.2.js</dd>
	<dd>base/jquery-ui*</dd>	
	<dt>images</dt>
	<dd>background images</dd>
	<dd>sprites</dd>
</dl>