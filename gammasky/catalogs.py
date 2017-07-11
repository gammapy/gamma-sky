"""
Prepare catalog data for the website.
"""
from pathlib import Path
import click
import numpy as np
from astropy.table import Table
import json
from gammapy.catalog import SourceCatalog3FHL, SourceCatalogGammaCat, SourceCatalog3FGL
from .utils import table_to_list_of_dict, dump_list_to_json, dump_dict_to_json

__all__ = [
    'make_tev_catalog_data',
    'make_tev_source_data',
    'make_3fhl_catalog_data',
    'make_3fhl_source_data',
    'make_3fgl_catalog_data',
    'make_3fgl_source_data',
    'make_snrcat_catalog_data'
]

TO_JSON_KWARGS = dict(orient='split', double_precision=5)


def make_3fhl_catalog_data():
    click.secho('Making 3FHL catalog data...', fg='green')

    out_dir = Path('src/app/data/cat/3fhl')
    out_dir.mkdir(parents=True, exist_ok=True)

    cat = SourceCatalog3FHL()
    # Indexing table - this is all the data we need for MapView.
    cols = ['Source_Name', 'RAJ2000', 'DEJ2000',
            'GLON', 'GLAT', 'ASSOC1', 'CLASS']
    cat.table = cat.table[cols]

    filename = 'src/app/data/cat/3fhl/cat.json'
    click.secho('Writing 3fhl {}'.format(filename), fg='green')
    dump_list_to_json(cat, filename)


def make_3fhl_source_data():
    click.secho('Making source data from 3FHL...', fg='green')

    cat = SourceCatalog3FHL()
    for source in cat:
        # For testing, only process some of the sources
        if source.index == 10:
            break

        out_dir = Path('src/app/data/cat/3fhl/sources/{:04d}'.format(source.index))
        out_dir.mkdir(parents=True, exist_ok=True)

        filename = 'src/app/data/cat/3fhl/sources/{:04d}/data.json'.format(source.index)
        click.secho('Writing: {}'.format(filename), fg='green')
        dump_dict_to_json(source, filename)


def make_tev_catalog_data():
    click.secho('Making TeV catalog data (from gamma-cat)...', fg='green')

    out_dir = Path('src/app/data/cat/tev')
    out_dir.mkdir(parents=True, exist_ok=True)

    cat = SourceCatalogGammaCat()
    cols = ['common_name', 'ra', 'dec', 'glon', 'glat',
            'other_names', 'classes']
    cat.table = cat.table[cols]

    filename = 'src/app/data/cat/tev/cat.json'
    click.secho('Writing tev {}'.format(filename), fg='green')
    dump_list_to_json(cat, filename)


def make_tev_source_data():
    click.secho('Making source data from TeV catalog...', fg='green')

    cat = SourceCatalogGammaCat()
    for source in cat:
        # For testing, only process some of the sources
        if source.index == 10:
            break

        out_dir = Path('src/app/data/cat/tev/sources/{:04d}'.format(source.index))
        out_dir.mkdir(parents=True, exist_ok=True)

        filename = 'src/app/data/cat/tev/sources/{:04d}/data.json'.format(source.index)
        click.secho('Writing: {}'.format(filename), fg='green')
        dump_dict_to_json(source, filename)


def make_3fgl_catalog_data():
    click.secho('Making 3FGL catalog data...', fg='green')

    out_dir = Path('src/app/data/cat/3fgl')
    out_dir.mkdir(parents=True, exist_ok=True)

    cat = SourceCatalog3FGL()
    cols = ['Source_Name', 'RAJ2000', 'DEJ2000', 'GLON',
            'GLAT', 'ASSOC1', 'CLASS1']
    cat.table = cat.table[cols]

    filename = 'src/app/data/cat/3fgl/cat.json'
    click.secho('Writing 3fgl {}'.format(filename), fg='green')
    dump_list_to_json(cat, filename)


def make_3fgl_source_data():
    click.secho('Making source data from 3FGL...', fg='green')

    cat = SourceCatalog3FGL()
    for source in cat:
        # For testing, only process some of the sources
        if source.index == 10:
            break

        out_dir = Path('src/app/data/cat/3fgl/sources/{:04d}'.format(source.index))
        out_dir.mkdir(parents=True, exist_ok=True)

        filename = 'src/app/data/cat/3fgl/sources/{:04d}/data.json'.format(source.index)
        click.secho('Writing: {}'.format(filename), fg='green')
        dump_dict_to_json(source, filename)


def make_snrcat_catalog_data():
    click.secho('Making SNRcat catalog data...', fg='green')

    out_dir = Path('src/app/data/cat/snrcat')
    out_dir.mkdir(parents=True, exist_ok=True)

    url = 'https://github.com/gammapy/gammapy-extra/blob/master/datasets/catalogs/snrcat.fits.gz?raw=true'
    cols = ['Source_Name', 'RAJ2000', 'DEJ2000', 'GLON', 'GLAT',
            'id_alt', 'size_radio_mean']
    table = Table.read(url)
    table = table[cols]
    table['snrcat_id'] = [
        _.replace('+', 'p').replace('-', 'm')
        for _ in table['Source_Name']
        ]
    list_of_dict = table_to_list_of_dict(table.filled())

    filename = 'src/app/data/cat/snrcat/cat.json'
    click.secho('Writing SNRcat {}'.format(filename), fg='green')
    with open(filename, 'w') as fh:
        json.dump(list_of_dict, fh)

# Note: We're not adding a make_snrcat_source_data() method because SNRCat has its own detail page that we can link to.
# http://www.physics.umanitoba.ca/snr/SNRcat/
