# cq-demo-utils

Some simple utilities in one package to simplify making
[container-query](https://github.com/ZeeCoder/container-query) demos online.

The problem with using something like Codepen with this package, is that it
needs a postcss processing step before a container can be initialised.

To make this possible, this module offers some common utility function which
processes CSS and injects it in the html afterwards.

**The fact that only patch versions are released is intentional.**

This package should in no way be considered for production, only for demoing purposes.
